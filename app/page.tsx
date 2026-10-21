"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UploadBox from "@/components/upload/UploadBox";
import PreviewCard from "@/components/upload/PreviewCard";
import ResultCard from "@/components/upload/ResultCard";
import FeatureCard from "@/components/Featurecard";
import History from "@/components/dashboard/History";


export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [refreshHistory, setRefreshHistory] = useState(0);

  const handleImage = (file: File) => {
    setImage(URL.createObjectURL(file));
    setImageFile(file);
  };

  const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result as string);

    reader.onerror = reject;
  });

  const handleGenerate = async () => {
    if (!imageFile) return;

    setLoading(true);

    try {
      // 1. Subir la imagen a Supabase Storage
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadResponse = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadData.image_url) {
        throw new Error(
          uploadData.error || "No se pudo subir la imagen"
        );
      }

      console.log("URL PERMANENTE:", uploadData.image_url);

      // 2. Generar el anuncio con IA
      const base64 = await toBase64(imageFile);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo generar el anuncio");
      }

      setResult(data);

      // 3. Guardar el producto con la URL permanente
      const saveResponse = await fetch("/api/save-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          image_url: uploadData.image_url,
        }),
      });

      const saveData = await saveResponse.json();

      if (!saveResponse.ok) {
        throw new Error(
          saveData.error || "No se pudo guardar el producto"
        );
      }

      console.log("PRODUCTO GUARDADO:", saveData);

      // 4. Actualizar el historial
      setRefreshHistory((prev) => prev + 1);
    } catch (error) {
      console.error("ERROR EN handleGenerate:", error);
    } finally {
      setLoading(false);
    }
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
              <ResultCard loading={loading} result={result} />
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

      <History refresh={refreshHistory} />

      <footer>
        <p>© 2026 Sellify AI</p>
      </footer>
    </main>
  );
}