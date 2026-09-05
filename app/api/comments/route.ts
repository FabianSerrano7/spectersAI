import { NextRequest, NextResponse } from "next/server";

// Lightweight comments store for client proposal pages, backed by a secret
// (unlisted) GitHub Gist instead of a database. Comment volume is expected
// to stay low, so this avoids provisioning a real datastore.
const TOKEN = process.env.GITHUB_GIST_TOKEN;
const GIST_DESCRIPTION = "specters-proposal-comments";
const FILENAME = "comments.json";
// Soft deterrent against blind bot spam. Not a real secret (it's readable in
// the page source) — the actual privacy boundary is the secret gist itself.
const SOFT_KEY = "specters-comments-2026";

type Comment = {
  id: string;
  proposalId: string;
  chapterId: string;
  chapterTitle: string;
  author: string;
  text: string;
  createdAt: string;
};

async function gh(path: string, init: RequestInit = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function findOrCreateGist(): Promise<{ id: string; comments: Comment[] }> {
  const gists = await gh("/gists");
  let gist = gists.find((g: { description: string }) => g.description === GIST_DESCRIPTION);

  if (!gist) {
    gist = await gh("/gists", {
      method: "POST",
      body: JSON.stringify({
        description: GIST_DESCRIPTION,
        public: false,
        files: { [FILENAME]: { content: "[]" } },
      }),
    });
    return { id: gist.id, comments: [] };
  }

  const full = await gh(`/gists/${gist.id}`);
  const raw = full.files?.[FILENAME]?.content ?? "[]";
  let comments: Comment[] = [];
  try {
    comments = JSON.parse(raw);
  } catch {
    comments = [];
  }
  return { id: gist.id, comments };
}

function checkKey(req: NextRequest) {
  return req.headers.get("x-key") === SOFT_KEY;
}

export async function GET(req: NextRequest) {
  if (!TOKEN) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  if (!checkKey(req)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { comments } = await findOrCreateGist();
  const proposalId = req.nextUrl.searchParams.get("proposal");
  const filtered = proposalId
    ? comments.filter((c) => c.proposalId === proposalId)
    : comments;

  return NextResponse.json(filtered);
}

export async function POST(req: NextRequest) {
  if (!TOKEN) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  if (!checkKey(req)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const proposalId = typeof body?.proposalId === "string" ? body.proposalId.trim() : "";
  const chapterId = typeof body?.chapterId === "string" ? body.chapterId.trim() : "";
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  const chapterTitle = typeof body?.chapterTitle === "string" ? body.chapterTitle.trim() : chapterId;
  const author = typeof body?.author === "string" && body.author.trim() ? body.author.trim() : "Anónimo";

  if (!proposalId || !chapterId || !text) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const { id, comments } = await findOrCreateGist();
  const comment: Comment = {
    id: crypto.randomUUID(),
    proposalId,
    chapterId,
    chapterTitle: chapterTitle.slice(0, 120),
    author: author.slice(0, 60),
    text: text.slice(0, 2000),
    createdAt: new Date().toISOString(),
  };
  const next = [...comments, comment];

  await gh(`/gists/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ files: { [FILENAME]: { content: JSON.stringify(next, null, 2) } } }),
  });

  return NextResponse.json(comment, { status: 201 });
}
