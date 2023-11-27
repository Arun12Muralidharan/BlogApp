import { NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request) {
  const posts = await prisma.post.findMany();

  return NextResponse.json({ message: "all posts", posts }, { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 500 }
    );
  }

  const newPost = await prisma.post.create({
    data: {
      title: body.title,
      description: body.description,
      postUserEmail: body.postUserEmail,
    },
  });

  return NextResponse.json(
    { message: "post created", newPost },
    { status: 201 }
  );
}
