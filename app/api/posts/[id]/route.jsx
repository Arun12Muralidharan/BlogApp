import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";

export async function GET(request, { params }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "post found", post }, { status: 200 });
}

export async function PUT(request, { params }) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 500 }
    );
  }

  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    return NextResponse.json({ error: "Post doesn't exist" }, { error: 404 });
  }

  const updatedPost = await prisma.post.update({
    where: { id: params.id },
    data: {
      title: body.title,
      description: body.description,
      postUserEmail: body.postUserEmail,
    },
  });

  return NextResponse.json(
    { message: "Post updated", updatedPost },
    { status: 201 }
  );
}

export async function DELETE(request, { params }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  await prisma.post.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "post deleted" }, { status: 201 });
}
