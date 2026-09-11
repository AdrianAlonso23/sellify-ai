"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UploadBox from "@/components/upload/UploadBox";
import PreviewCard from "@/components/upload/PreviewCard";
import ResultCard from "@/components/upload/ResultCard";
import FeatureCard from "@/components/Featurecard";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (file: File) => {
    setImage(URL.createObjectURL(file));
  };

  const handleGenerate = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };
  return (
    <main>
      <Navbar/>
      <Hero/>
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">

        <div className="mb-12 text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Demo en directo
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Prueba Sellify AI.
          </h2>

          <p className="mt-4 text-slate-600">
            Sube una imagen y genera un anuncio automáticamente.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          <UploadBox onImageSelect={handleImage} />

          {image && <PreviewCard image={image} />}

        </div>
 
        {image && (
          <div className="mt-8">

            <button
              onClick={handleGenerate}
              className="rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700"
            >
              Generar anuncio con IA
            </button>

            <div className="mt-8">
              <ResultCard loading={loading} />
            </div>

          </div>
        )}

      </section>
      <section
        id="como-funciona"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-12"
      >

        <div className="text-center">

          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Cómo funciona
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Crea un anuncio en tres pasos.
          </h2>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          <FeatureCard
            emoji="📸"
            title="Sube una foto"
            description="Haz una foto del producto que quieres vender."
          />

          <FeatureCard
            emoji="🤖"
            title="La IA crea el anuncio"
            description="Genera automáticamente título, descripción y precio."
          />

          <FeatureCard
            emoji="🚀"
            title="Publica en segundos"
            description="Copia el anuncio y publícalo en Wallapop o Vinted."
          />

        </div>

      </section>

      <section id="precios">
        <h2>Empieza gratis</h2>

        <p>
          Prueba Sellify AI antes de decidir si quieres el plan Pro.
        </p>

        <button>
          Crear mi primer anuncio
        </button>
      </section>

      <footer>
        <p>© 2026 Sellify AI</p>
      </footer>
    </main>
  );
}