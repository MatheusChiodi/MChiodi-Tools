import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const gerarSenha = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?";

    let chars = "";
    if (includeUpper) chars += upper;
    if (includeLower) chars += lower;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (!chars) {
      setPassword("Selecione ao menos uma opção.");
      return;
    }

    let senha = "";
    for (let i = 0; i < length; i++) {
      const rand = Math.floor(Math.random() * chars.length);
      senha += chars[rand];
    }

    setPassword(senha);
  };

  const copiar = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const limpar = () => {
    setPassword("");
    setCopied(false);
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
          Gerador de <span className="text-blue-400">Senhas</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Crie senhas fortes, seguras e aleatórias. Totalmente gratuito.
        </p>

        <div className="flex flex-col gap-6">
          {/* Resultado */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6">
            <p className="text-2xl font-bold text-neutral-50 md:text-3xl overflow-hidden">
              {password || "Sua senha aparecerá aqui"}
            </p>
          </div>

          {/* Configurações */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm text-neutral-400">Tamanho:</label>
              <input
                type="number"
                min={4}
                max={64}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-24 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-neutral-400">
                Letras Maiúsculas
              </label>
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={() => setIncludeUpper(!includeUpper)}
                className="h-4 w-4 rounded border-neutral-700 bg-neutral-900"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-neutral-400">
                Letras Minúsculas
              </label>
              <input
                type="checkbox"
                checked={includeLower}
                onChange={() => setIncludeLower(!includeLower)}
                className="h-4 w-4 rounded border-neutral-700 bg-neutral-900"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-neutral-400">Números</label>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
                className="h-4 w-4 rounded border-neutral-700 bg-neutral-900"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-neutral-400">
                Caracteres Especiais
              </label>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
                className="h-4 w-4 rounded border-neutral-700 bg-neutral-900"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={gerarSenha}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Gerar Senha
            </button>

            <button
              onClick={copiar}
              disabled={!password}
              className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
                password
                  ? "border-blue-600 text-blue-400 hover:bg-neutral-900"
                  : "cursor-not-allowed border-neutral-800 text-neutral-600"
              }`}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copiado" : "Copiar"}
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
        </div>
      </motion.section>
    </main>
  );
}
