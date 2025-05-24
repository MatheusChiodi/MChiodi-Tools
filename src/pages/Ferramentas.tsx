import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { tools } from "../data/tools";
import { ArrowRight } from "lucide-react";

export function Ferramentas() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [search, setSearch] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const categories = Array.from(new Set(tools.map((tool) => tool.type)));

  const categoryColors: Record<string, string> = {
    documentos: "bg-green-100 text-green-700",
    devtools: "bg-blue-100 text-blue-700",
    conversores: "bg-amber-100 text-amber-700",
    texto: "bg-purple-100 text-purple-700",
    seo: "bg-fuchsia-100 text-fuchsia-700",
    seguranca: "bg-red-100 text-red-700",
    rede: "bg-cyan-100 text-cyan-700",
    design: "bg-pink-100 text-pink-700",
  };

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(search);
    const matchesCategory =
      selectedCategory === "todos" || tool.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="space-y-16"
    >
      <section className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold md:text-6xl">
          Ferramentas que todo <span className="text-blue-400">Tools</span>{" "}
          precisa
        </h1>
        <p className="mx-auto max-w-2xl text-lg opacity-70 md:text-xl">
          Todas as ferramentas que você precisa no dia a dia, reunidas em um só
          lugar. Simples, rápido e gratuito.
        </p>

        <div className="flex justify-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Buscar ferramenta..."
            className="w-full max-w-md rounded-2xl border border-neutral-700 bg-neutral-900 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button
            onClick={() => setSelectedCategory("todos")}
            className={`rounded-full border px-4 py-2 ${
              selectedCategory === "todos"
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-neutral-700 hover:bg-neutral-800"
            } transition`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-4 py-2 capitalize ${
                selectedCategory === category
                  ? "border-blue-400 bg-blue-400 text-white"
                  : "border-neutral-700 hover:bg-neutral-800"
              } transition`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <motion.div
              key={tool.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-950 p-6 shadow-xl transition-all hover:shadow-xl"
            >
              <Link to={tool.path} className="h-full w-full">
                <span
                  className={`absolute right-0 top-0 w-fit rounded-full px-3 py-1 text-xs font-medium shadow-xl ${
                    categoryColors[tool.type] ||
                    "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {tool.type}
                </span>

                <div className="mt-4 flex flex-col gap-4">
                  <h3 className="text-xl font-bold transition group-hover:text-blue-400">
                    {tool.name}
                  </h3>
                  <p className="text-sm opacity-70">{tool.description}</p>
                </div>

                <Link
                  to={tool.path}
                  className="mt-6 flex items-center gap-2 font-medium text-blue-400 group-hover:underline"
                >
                  Acessar <ArrowRight size={18} />
                </Link>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center opacity-60">
            Nenhuma ferramenta encontrada.
          </p>
        )}
      </section>
    </motion.div>
  );
}
