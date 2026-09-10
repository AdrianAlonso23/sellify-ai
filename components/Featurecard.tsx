interface Props {
  emoji: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  emoji,
  title,
  description,
  
}: Props) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:-translate-y-1 hover:shadow-xl transition hover:-translate-y-1 transition duration-300 hover:shadow-xl">

      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl">
        {emoji}
      </div>

      <h3 className="text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-slate-600">
        {description}
      </p>

    </article>
  );
}