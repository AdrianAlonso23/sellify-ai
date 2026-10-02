import { NextResponse } from "next/server";

export async function GET() {
  try {
    const key = process.env.OPENROUTER_API_KEY;

    console.log("KEY EXISTS:", !!key);
    console.log("KEY PREFIX:", key?.substring(0, 10));
    console.log("KEY LENGTH:", key?.length);

    const response = await fetch(
      "https://openrouter.ai/api/v1/auth/key",
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      }
    );

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("DATA:", data);

    return NextResponse.json({
      status: response.status,
      data,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}