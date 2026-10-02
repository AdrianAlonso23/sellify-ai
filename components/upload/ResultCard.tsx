interface Result {
  brand: string;
  category: string;
  title: string;
  description: string;

  condition: string;
  condition_confidence: number;

  price: {
    min_price: number;
    recommended_price: number;
    max_price: number;
  };
}

interface Props {
  loading: boolean;
  result: Result | null;
}

export default function ResultCard({ loading, result }: Props) {

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Nuevo":
        return "bg-green-100 text-green-700";

      case "Como nuevo":
        return "bg-emerald-100 text-emerald-700";

      case "Buen estado":
        return "bg-blue-100 text-blue-700";

      case "Estado aceptable":
        return "bg-yellow-100 text-yellow-700";

      case "Algo desgastado":
        return "bg-orange-100 text-orange-700";

      case "Para reparar":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="rounded-full bg-green-100 px-3 py-1 text-green-700 text-xs w-fit">
        ✓ Anuncio listo para publicar
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
        Resultado IA
      </p>

      {loading ? (
        <div className="mt-6 animate-pulse space-y-4">
          <div className="h-6 rounded bg-slate-200" />
          <div className="h-4 rounded bg-slate-200" />
          <div className="h-4 rounded bg-slate-200" />
          <div className="h-12 rounded bg-slate-200" />
        </div>
      ) : result ? (
        <div className="mt-5 space-y-5">
          <div>
            <p className="text-sm text-slate-500">Marca</p>
            <p className="font-semibold">{result.brand}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Categoría</p>
            <p>{result.category}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Estado detectado</p>

            <div className="mt-2 flex items-center gap-3">
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {result.condition}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${getConditionColor(
                  result.condition
                )}`}
              >
                {result.condition_confidence}%
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-500">Título</p>
            <h3 className="text-xl font-bold">{result.title}</h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">Estado</p>
            <h3 className="text-xl font-bold">{result.condition}</h3>
          </div>

          <div className="mt-4">
            <div className="mb-2 flex justify-between text-sm">
              <span>Confianza de la IA</span>
              <span>{result.condition_confidence}%</span>
            </div>

            <div className="h-3 w-full rounded-full bg-slate-200">
              <div
                className="h-3 rounded-full bg-green-500 transition-all duration-500"
                style={{ width: `${result.condition_confidence}%` }}
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-500">Descripción</p>
            <p>{result.description}</p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">

            <div className="rounded-xl bg-green-50 p-4 text-center">
              <p className="text-xs text-green-700">Venta rápida</p>
              <p className="text-xl font-bold text-green-600">
                {result.price.min_price}€
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-4 text-center border border-blue-200">
              <p className="text-xs text-blue-700">Recomendado</p>
              <p className="text-2xl font-bold text-blue-600">
                {result.price.recommended_price}€
              </p>
            </div>

            <div className="rounded-xl bg-slate-100 p-4 text-center">
              <p className="text-xs text-slate-600">Intentar sacar más</p>
              <p className="text-xl font-bold">
                {result.price.max_price}€
              </p>
            </div>

          </div>

          <div className="flex gap-3 pt-4">
            <button className="rounded-xl bg-blue-600 px-5 py-3 text-white">
              📋 Copiar título
            </button>

            <button className="rounded-xl border border-slate-300 px-5 py-3">
              📄 Copiar descripción
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-slate-500">
          Sube una imagen y pulsa "Generar anuncio con IA".
        </p>
      )}
    </div>
  );
}