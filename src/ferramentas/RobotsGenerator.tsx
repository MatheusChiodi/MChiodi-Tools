import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function RobotsGenerator() {
  const [allowAll, setAllowAll] = useState(true);
  const [disallowPaths, setDisallowPaths] = useState<string[]>([]);
  const [pathInput, setPathInput] = useState("");
  const [sitemap, setSitemap] = useState("");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  const adicionarPath = () => {
    if (pathInput.trim()) {
      setDisallowPaths([...disallowPaths, pathInput.trim()]);
      setPathInput("");
    }
  };

  const removerPath = (index: number) => {
    const updated = [...disallowPaths];
    updated.splice(index, 1);
    setDisallowPaths(updated);
  };

  const gerar = () => {
    let result = "User-agent: *\n";

    if (allowAll && disallowPaths.length === 0) {
      result += "Allow: /\n";
    } else {
      if (!allowAll) {
        result += "Disallow: /\n";
      }
      disallowPaths.forEach((path) => {
        result += `Disallow: ${path}\n`;
      });
    }

    if (sitemap) {
      result += `\nSitemap: ${sitemap}\n`;
    }

    setGenerated(result.trim());
  };

  const copiar = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const limpar = () => {
    setAllowAll(true);
    setDisallowPaths([]);
    setSitemap("");
    setGenerated("");
    setCopied(false);
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
          Gerador de <span className="text-blue-400">robots.txt</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Crie facilmente um arquivo robots.txt para SEO e controle de
          indexação.
        </p>

        {/* Configurações */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              checked={allowAll}
              onChange={() => setAllowAll(!allowAll)}
              className="h-4 w-4 rounded border-neutral-700 bg-neutral-900"
            />
            <label className="text-sm text-neutral-400">
              Permitir acesso total (Allow: /)
            </label>
          </div>

          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <input
              type="text"
              value={pathInput}
              onChange={(e) => setPathInput(e.target.value)}
              placeholder="Ex: /admin ou /private"
              className="w-full max-w-xs rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={adicionarPath}
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Adicionar Disallow
            </button>
          </div>

          {disallowPaths.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-neutral-400">Disallow adicionados:</p>
              <ul className="flex flex-wrap justify-center gap-2">
                {disallowPaths.map((path, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-1 text-xs text-neutral-100"
                  >
                    {path}
                    <button
                      onClick={() => removerPath(idx)}
                      className="text-red-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <input
            type="text"
            value={sitemap}
            onChange={(e) => setSitemap(e.target.value)}
            placeholder="URL do Sitemap (opcional)"
            className="w-full max-w-xs rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Resultado */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6 text-left">
          {generated ? (
            <pre className="whitespace-pre-wrap break-words text-sm text-neutral-50">
              {generated}
            </pre>
          ) : (
            <p className="text-sm text-neutral-400">
              O conteúdo do robots.txt aparecerá aqui.
            </p>
          )}
        </div>

        {/* Botões */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={gerar}
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Gerar Robots.txt
          </button>

          <button
            onClick={copiar}
            disabled={!generated}
            className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
              generated
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
