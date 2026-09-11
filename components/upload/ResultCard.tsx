interface Props {
  loading: boolean;
}

export default function ResultCard({ loading }: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

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
      ) : (
        <div className="mt-5 space-y-4">
 
          <div>
            <p className="text-sm text-slate-500">Título</p>

            <h3 className="font-bold">
              Nike Air Max 270 negras · Talla 42
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">Descripción</p>

            <p className="text-slate-700">
              Zapatillas Nike Air Max 270 originales en muy buen estado,
              poco uso y listas para envío.
            </p>
          </div>

          <div className="rounded-xl bg-green-50 p-4">
            <p className="text-sm text-green-700">
              Precio recomendado
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              65 €
            </h2>
          </div>

        </div>
      )}
    </div>
  );
}