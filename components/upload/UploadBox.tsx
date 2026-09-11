"use client";

import { useRef } from "react";

interface UploadBoxProps {
  onImageSelect: (file: File) => void;
}

export default function UploadBox({ onImageSelect }: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    onImageSelect(file);
  };
 
  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      }}
      className="cursor-pointer rounded-3xl border-2 border-dashed border-blue-300 bg-blue-50 p-10 text-center transition hover:border-blue-500 hover:bg-blue-100"
    >
      <div className="text-6xl">📷</div>

      <h3 className="mt-4 text-xl font-bold text-slate-900">
        Arrastra una imagen aquí
      </h3>

      <p className="mt-2 text-slate-500">
        o haz clic para seleccionar una foto.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}