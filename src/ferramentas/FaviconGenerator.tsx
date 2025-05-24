import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowLeft, Download, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function FaviconGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("🚀");
  const [size, setSize] = useState(64);
  const [bgColor, setBgColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#ffffff");
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);

  const gerarFavicon = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fundo
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    // Texto
    ctx.fillStyle = textColor;
    ctx.font = `${size * 0.6}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, size / 2, size / 2);

    const url = canvas.toDataURL("image/png");
    setFaviconUrl(url);
  };

  const limpar = () => {
    setText("🚀");
    setSize(64);
    setBgColor("#000000");
    setTextColor("#ffffff");
    setFaviconUrl(null);
  };

  const baixar = () => {
    if (!faviconUrl) return;
    const link = document.createElement("a");
    link.href = faviconUrl;
    link.download = "favicon.png";
    link.click();
  };

  return (
    <main className="mx-auto max-w-3xl px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-24 space-y-10 text-center"
      >
        <h1 className="text-4xl font-extrabold text-neutral-50 md:text-6xl">
          Gerador de <span className="text-blue-400">Favicon</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Crie favicons personalizados com texto, emoji ou símbolo.
        </p>

        {/* Configurações */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={5}
            placeholder="Texto ou Emoji"
            className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={16}>16x16</option>
            <option value={32}>32x32</option>
            <option value={64}>64x64</option>
            <option value={128}>128x128</option>
          </select>

          <div className="flex items-center gap-2">
            <label className="text-sm text-neutral-400">Cor de Fundo:</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-neutral-400">Cor do Texto:</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6">
          {faviconUrl ? (
            <img
              src={faviconUrl}
              alt="Favicon Preview"
              className="mx-auto h-24 w-24 rounded-xl border border-neutral-800"
            />
          ) : (
            <p className="text-sm text-neutral-400">
              O favicon aparecerá aqui.
            </p>
          )}
        </div>

        {/* Canvas oculto */}
        <canvas ref={canvasRef} className="hidden"></canvas>

        {/* Botões */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={gerarFavicon}
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Gerar Favicon
          </button>

          <button
            onClick={baixar}
            disabled={!faviconUrl}
            className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
              faviconUrl
                ? "border-blue-600 text-blue-400 hover:bg-neutral-900"
                : "cursor-not-allowed border-neutral-800 text-neutral-600"
            }`}
          >
            <Download size={18} /> Baixar
          </button>

          <button
            onClick={limpar}
            className="flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900"
          >
            <RefreshCcw size={18} /> Limpar
          </button>
        </div>

        {/* Botão Voltar */}
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
