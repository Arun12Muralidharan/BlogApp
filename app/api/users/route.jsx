import { NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request) {
  const users = await prisma.user.findMany();
  return NextResponse.json({ message: "All users", users }, { status: 200 });
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

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) {
    return NextResponse.json({ error: "User already exist" }, { status: 500 });
  }

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  return NextResponse.json(
    { message: "User Created", newUser },
    { status: 201 }
  );
}
