import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/Featurecard";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero/>

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