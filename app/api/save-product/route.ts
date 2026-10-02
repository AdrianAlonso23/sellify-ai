import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("========== SAVE PRODUCT ==========");
    console.log("BODY RECIBIDO:", body);

    const product = {
      title: body.title,
      description: body.description,
      brand: body.brand,
      category: body.category,
      condition: body.condition,
      condition_confidence: body.condition_confidence,

      min_price: body.price?.min_price,
      recommended_price: body.price?.recommended_price,
      max_price: body.price?.max_price,

      image_url: body.image_url,
    };

    console.log("PRODUCTO A INSERTAR:", product);

    const { data, error } = await supabase
      .from("products")
      .insert(product)
      .select();

    console.log("SUPABASE DATA:", data);
    console.log("SUPABASE ERROR:", error);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("ERROR COMPLETO SAVE PRODUCT:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Error guardando producto",
        details: String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "save-product",
  });
}