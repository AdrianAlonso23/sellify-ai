import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">

        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Sellify AI"
            width={36}
            height={36}
          />

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Sellify
            <span className="text-blue-600"> AI</span>
          </span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#como-funciona" className="text-sm text-slate-600 hover:text-slate-900">
            Cómo funciona
          </a>

          <a href="#precios" className="text-sm text-slate-600 hover:text-slate-900">
            Precios
          </a>

          <button className="rounded-xl bg-slate-900 px-5 py-3 text-white font-medium hover:bg-slate-800">
            Probar gratis
          </button>
        </div>

      </div>
    </nav>
  );
}