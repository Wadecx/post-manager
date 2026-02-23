import { NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "@/lib/posts";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = getPostById(parseInt(id));

  if (!post) {
    return NextResponse.json({ error: "Post non trouvé" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updatedPost = updatePost(parseInt(id), {
    title: body.title,
    body: body.body,
  });

  if (!updatedPost) {
    return NextResponse.json({ error: "Post non trouvé" }, { status: 404 });
  }

  return NextResponse.json(updatedPost);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = deletePost(parseInt(id));

  if (!deleted) {
    return NextResponse.json({ error: "Post non trouvé" }, { status: 404 });
  }

  return NextResponse.json({ message: "Post supprimé avec succès" });
}
