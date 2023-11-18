import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";

export async function GET(request, { params }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user)
    return NextResponse.json({ error: "User doesn't exist" }, { status: 404 });

  return NextResponse.json({ message: "user found", user }, { status: 200 });
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

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    return NextResponse.json({ error: "user doesn't exist" }, { status: 404 });
  }

  const checkMailUnique = await prisma.user.findUnique({
    where: { email: body.email },
  });

  const checkMailvsUser = await prisma.user.findUnique({
    where: { email: body.email, id: params.id },
  });

  if (checkMailUnique && !checkMailvsUser) {
    return NextResponse.json({ error: "mail already exist" }, { status: 500 });
  }

  const updatedUser = await prisma.user.update({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
    where: { id: params.id },
  });

  return NextResponse.json(
    { message: "user udpated", updatedUser },
    { status: 201 }
  );
}

export async function DELETE(request, { params }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    return NextResponse.json({ error: "User doesn't exist" }, { status: 404 });
  }

  await prisma.user.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "user deleted" }, { status: 200 });
}
