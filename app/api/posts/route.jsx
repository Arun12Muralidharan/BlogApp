import { NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request) {
  const pageName = request.url.split("?")[1];
  const pageNum = +pageName?.split("=")[1] || 1;

  const posts = await prisma.post.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    skip: (pageNum - 1) * 5,
    take: 5,
  });

  return NextResponse.json({ message: "all posts", posts }, { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  // console.log(body);
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 501 }
    );
  }

  const newPost = await prisma.post.create({
    data: {
      title: body.title,
      description: body.description,
      postUserEmail: body.postUserEmail,
      postUser: body.postUser,
    },
  });

  return NextResponse.json(
    { message: "post created", newPost },
    { status: 201 }
  );
}
