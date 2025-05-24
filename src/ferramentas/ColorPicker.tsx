import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw, EyeDropper } from "lucide-react";
import { Link } from "react-router-dom";

export function ColorPicker() {
  const [cor, setCor] = useState("#00aaff");
  const [copied, setCopied] = useState("");

  const copiar = (valor: string) => {
    navigator.clipboard.writeText(valor);
    setCopied(valor);
    setTimeout(() => setCopied(""), 2000);
  };

  const limpar = () => {
    setCor("#00aaff");
    setCopied("");
  };

  const hex = cor;
  const rgb = hexParaRgb(hex);
  const hsl = hexParaHsl(hex);

  return (
    <main className="mx-auto max-w-3xl px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-24 space-y-10 text-center"
      >
        <h1 className="text-4xl font-extrabold text-neutral-50 md:text-6xl">
          Color <span className="text-blue-400">Picker</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Selecione uma cor e copie o código em HEX, RGB ou HSL.
        </p>

        <div className="flex flex-col gap-6">
          {/* Preview da Cor */}
          <div
            className="mx-auto h-32 w-32 rounded-2xl border border-neutral-800"
            style={{ backgroundColor: cor }}
          />

          {/* Input de Cor */}
          <input
            type="color"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            className="h-14 w-28 cursor-pointer appearance-none rounded-xl border border-neutral-700 bg-neutral-900 p-1"
          />

          {/* Resultados */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card
              label="HEX"
              value={hex}
              copied={copied}
              onCopy={() => copiar(hex)}
            />
            <Card
              label="RGB"
              value={rgb}
              copied={copied}
              onCopy={() => copiar(rgb)}
            />
            <Card
              label="HSL"
              value={hsl}
              copied={copied}
              onCopy={() => copiar(hsl)}
            />
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={limpar}
              className="flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900"
            >
              <RefreshCcw size={18} /> Resetar
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
        </div>
      </motion.section>
    </main>
  );
}

// Componente Card para exibir e copiar cada formato
function Card({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: string;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-6 py-4">
      <p className="text-sm text-neutral-400">{label}</p>
      <p className="mt-1 break-words text-lg font-bold text-neutral-100">
        {value}
      </p>
      <button
        onClick={onCopy}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-700 px-3 py-2 text-xs font-medium text-neutral-300 transition hover:bg-neutral-900"
      >
        {copied === value ? <Check size={16} /> : <Copy size={16} />}
        {copied === value ? "Copiado" : "Copiar"}
      </button>
    </div>
  );
}

// Funções auxiliares para conversão
function hexParaRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexParaHsl(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100
  )}%)`;
}
