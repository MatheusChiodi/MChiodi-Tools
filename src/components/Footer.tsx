import { Github, Linkedin, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AdBanner } from "./AdBanner";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mt-32 w-full border-t border-neutral-800 bg-neutral-950 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-6 py-12 md:flex-row">
        <div className="flex flex-col gap-4">
          <Link to="/" className="text-2xl font-extrabold text-neutral-50">
            <span className="text-blue-400">MChiodi</span>Tools
          </Link>
          <p className="max-w-xs text-sm text-neutral-400">
            Ferramentas que aceleram sua vida dev. Simples, rápidas e gratuitas.
          </p>
        </div>

        <div className="flex w-[320px] flex-col md:items-center">
          <div className="flex gap-5">
            <a href="https://github.com/MatheusChiodi" target="_blank">
              <Github className="text-neutral-300 transition hover:text-blue-400" />
            </a>
            <a
              href="https://www.linkedin.com/in/matheus-chiodi/"
              target="_blank"
            >
              <Linkedin className="text-neutral-300 transition hover:text-blue-400" />
            </a>
            <a href="https://www.youtube.com/@MChiodiDev" target="_blank">
              <Youtube className="text-neutral-300 transition hover:text-blue-400" />
            </a>
          </div>
        </div>

        <div className="flex w-[320px] flex-col gap-6 md:flex-row md:justify-end md:gap-16">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-neutral-200">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/ferramentas" className="hover:text-blue-400">
                  Ferramentas
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-blue-400">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/termos" className="hover:text-blue-400">
                  Termos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800 py-6 text-center text-xs text-neutral-500">
        © 2025 MChiodi Tools. Todos os direitos reservados.
      </div>

      <AdBanner />
    </motion.footer>
  );
}
