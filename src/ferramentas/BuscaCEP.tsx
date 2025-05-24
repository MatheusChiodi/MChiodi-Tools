import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Search, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function BuscaCEP() {
  const [cep, setCep] = useState("");
  const [dados, setDados] = useState<any>(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarCEP = async () => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      setErro("Digite um CEP válido com 8 dígitos.");
      setDados(null);
      return;
    }

    setLoading(true);
    setErro("");
    setDados(null);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const json = await res.json();

      if (json.erro) {
        setErro("CEP não encontrado.");
        setDados(null);
      } else {
        setDados(json);
      }
    } catch (e) {
      setErro("Erro ao buscar o CEP.");
      setDados(null);
    }

    setLoading(false);
  };

  const limpar = () => {
    setCep("");
    setDados(null);
    setErro("");
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
          Busca de <span className="text-blue-400">CEP</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Consulte informações de qualquer CEP do Brasil.
        </p>

        <div className="flex flex-col gap-6">
          {/* Input */}
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="Digite o CEP (apenas números)"
            maxLength={9}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-center text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={buscarCEP}
              disabled={!cep}
              className={`flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 ${
                !cep ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <Search size={18} /> Buscar
            </button>

            <button
              onClick={limpar}
              className="flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900"
            >
              <RefreshCcw size={18} /> Limpar
            </button>
          </div>

          {/* Resultado */}
          {loading && (
            <div className="text-sm text-neutral-400">Buscando...</div>
          )}

          {erro && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 px-6 py-4 text-sm text-red-400">
              {erro}
            </div>
          )}

          {dados && (
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6 text-left text-sm text-neutral-300">
              <p>
                <span className="font-semibold text-neutral-100">CEP:</span>{" "}
                {dados.cep}
              </p>
              <p>
                <span className="font-semibold text-neutral-100">
                  Logradouro:
                </span>{" "}
                {dados.logradouro || "-"}
              </p>
              <p>
                <span className="font-semibold text-neutral-100">Bairro:</span>{" "}
                {dados.bairro || "-"}
              </p>
              <p>
                <span className="font-semibold text-neutral-100">Cidade:</span>{" "}
                {dados.localidade || "-"}
              </p>
              <p>
                <span className="font-semibold text-neutral-100">Estado:</span>{" "}
                {dados.uf || "-"}
              </p>
              <p>
                <span className="font-semibold text-neutral-100">DDD:</span>{" "}
                {dados.ddd || "-"}
              </p>
            </div>
          )}

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
