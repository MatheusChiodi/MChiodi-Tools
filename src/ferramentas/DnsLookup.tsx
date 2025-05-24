import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, RefreshCcw, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface DnsRecord {
  name: string;
  type: string;
  data: string;
  ttl: number;
}

export function DnsLookup() {
  const [domain, setDomain] = useState("");
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tipos = ["A", "AAAA", "MX", "TXT", "CNAME", "NS"];

  const consultarDNS = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    setError("");
    setRecords([]);

    try {
      const resultados: DnsRecord[] = [];

      for (const type of tipos) {
        const res = await fetch(
          `https://dns.google/resolve?name=${domain}&type=${type}`,
        );
        const json = await res.json();

        if (json.Answer) {
          json.Answer.forEach((item: any) => {
            resultados.push({
              name: item.name,
              type: type,
              data: item.data,
              ttl: item.TTL,
            });
          });
        }
      }

      if (resultados.length === 0) {
        setError("Nenhum registro DNS encontrado.");
      }

      setRecords(resultados);
    } catch {
      setError("Erro ao consultar DNS. Verifique o domínio e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const limpar = () => {
    setDomain("");
    setRecords([]);
    setError("");
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
          Consulta de <span className="text-blue-400">DNS</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Descubra registros DNS de qualquer domínio. Verifique A, AAAA, MX,
          TXT, NS e CNAME.
        </p>

        {/* Input */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Ex.: google.com"
            className="w-full max-w-lg rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={consultarDNS}
            disabled={loading}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Search size={16} />
            {loading ? "Consultando..." : "Consultar"}
          </button>
        </div>

        {/* Resultado */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-6 py-6">
          {error && <p className="text-sm text-red-400">{error}</p>}

          {records.length > 0 && (
            <div className="space-y-4">
              {records.map((r, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-left"
                >
                  <p className="text-sm text-blue-400">
                    🔗 {r.name} — {r.type}
                  </p>
                  <p className="text-sm text-neutral-100">📄 {r.data}</p>
                  <p className="text-xs text-neutral-500">⏳ TTL: {r.ttl}</p>
                </div>
              ))}
            </div>
          )}

          {!records.length && !error && (
            <p className="text-sm text-neutral-400">
              O resultado da consulta DNS aparecerá aqui.
            </p>
          )}
        </div>

        {/* Botões */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
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
