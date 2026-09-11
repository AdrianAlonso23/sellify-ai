import Image from "next/image";

interface PreviewProps {
  image: string;
}

export default function PreviewCard({ image }: PreviewProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
        Vista previa
      </p>
 
      <div className="overflow-hidden rounded-2xl bg-slate-100">
        <Image
          src={image}
          alt="Vista previa"
          width={600}
          height={600}
          className="h-auto w-full object-cover"
        />
      </div>

    </div>
  );
}