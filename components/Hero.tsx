import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">

      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-300 opacity-20 blur-3xl"/>
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-300 opacity-20 blur-3xl"/>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-12">

        <div>
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            🚀 IA para vendedores de Wallapop y Vinted
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
            Vende tus productos
            <span className="text-blue-600"> 10 veces más rápido.</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Sube una foto y Sellify AI genera automáticamente el anuncio perfecto.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-xl bg-blue-600 px-6 py-4 text-white font-semibold hover:bg-blue-700">
              Probar gratis
            </button>

            <button className="rounded-xl border border-slate-300 px-6 py-4 font-semibold text-slate-700 hover:bg-slate-100">
              Ver demo
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">

          <div className="rounded-2xl bg-slate-100 p-8 flex justify-center">
              <Image
                src="/images/nike.png"
                alt="Nike Air Max"
                width={280}
                height={280}
                className="drop-shadow-2xl"
              />
            </div>

          <div className="mt-6 rounded-2xl bg-blue-50 p-5">

            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Anuncio generado
            </p>

            <h3 className="mt-2 text-xl font-bold">
              Nike Air Max 90  · Talla 42
            </h3>

            <p className="mt-3 text-slate-600">
              Zapatillas Nike Air Max originales...
            </p>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-white p-4">

              <div>
                <p className="text-sm text-slate-500">
                  Precio recomendado
                </p>

                <h2 className="text-3xl font-bold text-green-600">
                  65 €
                </h2>
              </div>

              <button className="rounded-lg bg-slate-900 px-4 py-2 text-white">
                Copiar anuncio
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}