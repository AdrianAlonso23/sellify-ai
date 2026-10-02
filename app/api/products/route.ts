import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    return NextResponse.json(
      {
        message: error.message,
        details: error,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}