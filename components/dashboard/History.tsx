"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  image_url: string;
  brand: string;
  category: string;
  title: string;
  description: string;
  condition: string;
  condition_confidence: number;

  min_price: number;
  recommended_price: number;
  max_price: number;

  created_at: string;
}

interface HistoryProps {
  refresh: number;
}

export default function History({ refresh }: HistoryProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [refresh]);

  async function loadProducts() {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      console.log("API PRODUCTS:", data);

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold mb-8">Mis anuncios</h2>

        <p>Cargando anuncios...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="mb-8 text-3xl font-bold">
        Mis anuncios ({products.length})
      </h2>

      {products.length === 0 ? (
        <div className="rounded-3xl border border-dashed p-12 text-center text-slate-500">
          Aún no has generado ningún anuncio.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-3xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <img
                src={product.image_url}
                alt={product.title}
                className="h-52 w-full rounded-2xl object-cover"
              />

              <p className="mt-4 text-sm text-slate-500">
                {product.brand}
              </p>

              <h3 className="mt-1 font-bold text-lg">
                {product.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                {product.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {product.condition}
                </span>

                <span className="font-bold text-green-600">
                  {product.recommended_price} €
                </span>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                {new Date(product.created_at).toLocaleDateString("es-ES")}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}