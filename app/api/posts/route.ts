import { NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.title || !body.body) {
    return NextResponse.json(
      { error: "Le titre et le contenu sont requis" },
      { status: 400 }
    );
  }

  const newPost = createPost({
    title: body.title,
    body: body.body,
  });

  return NextResponse.json(newPost, { status: 201 });
}
