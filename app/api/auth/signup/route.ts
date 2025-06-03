import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prismaClient";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "이메일, 비밀번호, 이름은 모두 필수입니다." },
        { status: 400 },
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      const githubAccount = await prisma.account.findFirst({
        where: {
          provider: "GITHUB",
          user: { email },
        },
      });

      if (githubAccount) {
        return NextResponse.json(
          {
            message:
              "이미 GitHub로 가입되어 있어요. GitHub로 로그인 하시겠어요?",
            code: "GITHUB_EXIST",
          },
          { status: 409 },
        );
      }

      return NextResponse.json(
        { message: "이미 사용 중인 이메일입니다." },
        { status: 400 },
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: err.message || "서버 에러가 발생했습니다." },
      { status: 500 },
    );
  }
}
