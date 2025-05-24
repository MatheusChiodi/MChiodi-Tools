import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, Plus, RefreshCcw, Trash } from "lucide-react";
import { Link } from "react-router-dom";

interface UrlItem {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export function SitemapGenerator() {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  const adicionarUrl = () => {
    if (!urlInput.trim()) return;
    setUrls([
      ...urls,
      {
        loc: urlInput.trim(),
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "monthly",
        priority: "0.8",
      },
    ]);
    setUrlInput("");
  };

  const removerUrl = (index: number) => {
    const updated = [...urls];
    updated.splice(index, 1);
    setUrls(updated);
  };

  const atualizarUrl = (index: number, key: keyof UrlItem, value: string) => {
    const updated = [...urls];
    updated[index][key] = value;
    setUrls(updated);
  };

  const gerar = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("")}
</urlset>`.trim();

    setGenerated(xml);
  };

  const copiar = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const limpar = () => {
    setUrls([]);
    setGenerated("");
    setCopied(false);
  };

  return (
    <main className="mx-auto max-w-6xl px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-24 space-y-10 text-center"
      >
        <h1 className="text-4xl font-extrabold text-neutral-50 md:text-6xl">
          Gerador de <span className="text-blue-400">Sitemap.xml</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Crie facilmente um arquivo sitemap.xml para melhorar o SEO do seu
          site.
        </p>

        {/* Form URL */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://www.seusite.com/"
            className="w-full max-w-lg rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={adicionarUrl}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={16} /> Adicionar URL
          </button>
        </div>

        {/* Lista de URLs */}
        {urls.length > 0 && (
          <div className="space-y-4">
            {urls.map((u, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-4 sm:flex-row sm:items-center"
              >
                <input
                  value={u.loc}
                  onChange={(e) => atualizarUrl(idx, "loc", e.target.value)}
                  className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100"
                />
                <input
                  type="date"
                  value={u.lastmod}
                  onChange={(e) => atualizarUrl(idx, "lastmod", e.target.value)}
                  className="w-32 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100"
                />
                <select
                  value={u.changefreq}
                  onChange={(e) =>
                    atualizarUrl(idx, "changefreq", e.target.value)
                  }
                  className="w-32 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100"
                >
                  <option value="always">always</option>
                  <option value="hourly">hourly</option>
                  <option value="daily">daily</option>
                  <option value="weekly">weekly</option>
                  <option value="monthly">monthly</option>
                  <option value="yearly">yearly</option>
                  <option value="never">never</option>
                </select>
                <input
                  type="number"
                  min={0}
                  max={1}
                  step={0.1}
                  value={u.priority}
                  onChange={(e) =>
                    atualizarUrl(idx, "priority", e.target.value)
                  }
                  className="w-20 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100"
                />
                <button
                  onClick={() => removerUrl(idx)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Resultado */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6 text-left">
          {generated ? (
            <pre className="whitespace-pre-wrap break-words text-sm text-neutral-50">
              {generated}
            </pre>
          ) : (
            <p className="text-sm text-neutral-400">
              O conteúdo do sitemap.xml aparecerá aqui.
            </p>
          )}
        </div>

        {/* Botões */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={gerar}
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Gerar Sitemap
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
