import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: "No se recibió ninguna imagen" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "google/gemma-4-26b-a4b-it:free",

          models: [
            "google/gemma-4-26b-a4b-it:free",
            "dots-studio/dots-3-note-preview:free",
            "nex-agi/nex-n2-pro:free",
          ],

          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `
Analiza el producto de la imagen.

Responde exclusivamente en español.

Debes determinar también el ESTADO del producto basándote únicamente en lo que se pueda observar en la imagen.

Usa únicamente uno de estos estados:

- Nuevo
- Como nuevo
- Buen estado
- Estado aceptable
- Algo desgastado
- Para reparar

El precio debe ser una estimación razonable para segunda mano y DEBE tener en cuenta:
- tipo de producto
- marca
- modelo si es identificable
- estado
- desgaste visible
- daños visibles
- suciedad o manchas visibles
- accesorios visibles

No inventes defectos ni características que no puedan verse.

IDENTIFICACIÓN DEL PRODUCTO:
- Identifica el modelo exacto cuando sea posible.
- Utiliza el modelo identificado dentro del título.
- Por ejemplo, si la imagen corresponde a un iPhone 17 Pro Max, el título debe contener "iPhone 17 Pro Max".
- No sustituyas un modelo identificable por una descripción genérica como "iPhone Apple de alta gama".
- Si no puedes identificar el modelo con suficiente seguridad, utiliza un título genérico adecuado.
- No pongas nada de estado en el titulo.
- No inventes modelos.

PRECIO DEL PRODUCTO
  
Devuelve SOLO un JSON válido con exactamente estos campos:

{
  "brand": "string",
  "category": "string",
  "title": "string",
  "description": "string",

  "condition": "Nuevo | Como nuevo | Buen estado | Estado aceptable | Algo desgastado | Para reparar",

  "condition_confidence": 0,

  "price": {
    "min_price": 0,
    "recommended_price": 0,  
    "max_price": 0
  }
}

condition_confidence debe ser un número entre 0 y 100 que indique qué tan segura está la IA del estado del producto basándose únicamente en la imagen.

{
  "condition_reason": "La suela muestra poco desgaste y no se aprecian manchas importantes.",
  "photo_quality_score": 92
}

No inventes marca, modelo o talla si no son visibles.

Si no puedes identificar algo con suficiente confianza, escribe "Desconocido".

Describe el producto de manera concisa y persuasiva, no mas de 300 caracteres, para que sea atractivo para un comprador de segunda mano.
                  `,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: image,
                  },
                },
              ],
            },
          ],

          response_format: {
            type: "json_object",
          },
        }),
      }
    );

    const data = await response.json();

    console.log("OPENROUTER STATUS:", response.status);
    console.log("MODELO:", data.model);
    console.log("RESPUESTA:", data.choices?.[0]?.message?.content);
    console.log("ERROR:", data.error);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.error?.message || "Error de OpenRouter",
          details: data.error,
        },
        { status: response.status }
      );
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "El modelo no devolvió contenido" },
        { status: 502 }
      );
    }

    try {
      const result = JSON.parse(content);

      return NextResponse.json(result);
    } catch {
      console.error("JSON INVÁLIDO:", content);

      return NextResponse.json(
        {
          error: "El modelo no devolvió JSON válido",
          raw: content,
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("ERROR COMPLETO:", error);

    return NextResponse.json(
      { error: "Error generando anuncio" },
      { status: 500 }
    );
  }
}