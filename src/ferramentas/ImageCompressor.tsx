import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Download, RefreshCcw, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setOriginalSize(selected.size);
      compressImage(selected);
    }
  };

  const compressImage = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const mimeType =
          file.type === "image/png"
            ? "image/png"
            : file.type === "image/webp"
              ? "image/webp"
              : "image/jpeg";

        const dataUrl = canvas.toDataURL(mimeType, quality);
        setOutput(dataUrl);

        // Calcular tamanho em bytes
        const base64Length =
          dataUrl.length - ("data:image/png;base64,".length + 1);
        const sizeInBytes = Math.floor(base64Length * (3 / 4));
        setCompressedSize(sizeInBytes);
      };
    };
  };

  const limpar = () => {
    setFile(null);
    setOutput(null);
    setOriginalSize(0);
    setCompressedSize(0);
  };

  const baixar = () => {
    if (!output) return;
    const link = document.createElement("a");
    link.href = output;
    link.download = "imagem-comprimida.png";
    link.click();
  };

  return (
    <main className="mx-auto max-w-5xl px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-24 space-y-10 text-center"
      >
        <h1 className="text-4xl font-extrabold text-neutral-50 md:text-6xl">
          Compressor de <span className="text-blue-400">Imagem</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Comprima imagens JPEG, PNG ou WebP diretamente no navegador.
        </p>

        {/* Upload */}
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            id="upload"
          />
          <label
            htmlFor="upload"
            className="flex cursor-pointer items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm text-neutral-300 transition hover:bg-neutral-900"
          >
            <Upload size={18} />
            Selecionar Imagem
          </label>

          {file && (
            <div className="flex flex-col gap-2 text-sm text-neutral-400">
              <p>
                📄 <strong>{file.name}</strong>
              </p>
              <p>🗂️ Tamanho original: {(originalSize / 1024).toFixed(2)} KB</p>
            </div>
          )}
        </div>

        {/* Qualidade */}
        {file && (
          <div className="flex items-center justify-center gap-4">
            <label className="text-sm text-neutral-400">
              Qualidade ({Math.round(quality * 100)}%)
            </label>
            <input
              type="range"
              min={0.01}
              max={1}
              step={0.05}
              value={quality}
              onChange={(e) => {
                const val = Number(e.target.value);
                setQuality(val);
                compressImage(file);
              }}
              className="w-64"
            />
          </div>
        )}

        {/* Resultado */}
        {output && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Original */}
            <div className="space-y-2">
              <h3 className="text-sm text-neutral-400">Imagem Original</h3>
              <img
                src={URL.createObjectURL(file!)}
                alt="Original"
                className="rounded-xl border border-neutral-800"
              />
            </div>

            {/* Comprimida */}
            <div className="space-y-2">
              <h3 className="text-sm text-neutral-400">
                Imagem Comprimida ({(compressedSize / 1024).toFixed(2)} KB)
              </h3>
              <img
                src={output}
                alt="Comprimida"
                className="rounded-xl border border-neutral-800"
              />
            </div>
          </div>
        )}

        {/* Botões */}
        {output && (
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={baixar}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Download size={18} /> Baixar Imagem
            </button>

            <button
              onClick={limpar}
              className="flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900"
            >
              <RefreshCcw size={18} /> Limpar
            </button>
          </div>
        )}

        {/* Voltar */}
        <div className="pt-6">
          <Link
            to="/ferramentas"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm text-neutral-300 transition hover:bg-neutral-900"
          >
            <ArrowLeft size={18} />
            Voltar para Ferramentas
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
