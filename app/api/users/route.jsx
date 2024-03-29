import { NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";
import bcryptjs from "bcryptjs";

export async function GET(request) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json("Validation failed", { status: 500 });
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) {
    return NextResponse.json("User already exist", { status: 501 });
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(body.password, salt);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
