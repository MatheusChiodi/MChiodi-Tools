import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { tools } from "../data/tools";

function NavItem({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const location = useLocation();

  const isHome = to === "/";
  const isActive = isHome
    ? location.pathname === "/"
    : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${
        isActive ? "text-blue-400" : "text-neutral-300 hover:text-blue-400"
      } transition`}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const resultados = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      tool.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (path: string) => {
    navigate(path);
    setSearch("");
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 z-50 flex w-full items-center justify-between border-b border-neutral-800 px-4 py-4 backdrop-blur-md sm:px-6`}
      >
        <div className="cursor-pointer text-2xl font-extrabold tracking-tight text-neutral-50">
          <Link to="/">
            <span className="text-blue-400">MChiodi</span>Tools
          </Link>
        </div>

        <div className="relative flex items-center gap-4">
          {/* Search Desktop */}
          <div className="relative hidden md:block">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar..."
                className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="rounded-lg p-2 transition hover:bg-neutral-800">
                <Search size={18} />
              </button>
            </div>

            {search.trim() !== "" && (
              <div className="absolute left-0 top-12 z-50 w-72 rounded-xl border border-neutral-800 bg-neutral-950 shadow-xl">
                {resultados.length > 0 ? (
                  resultados.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleSelect(tool.path)}
                      className="flex w-full items-start gap-2 px-4 py-3 text-left text-sm text-neutral-300 hover:bg-neutral-900"
                    >
                      <div>
                        <p className="font-medium text-neutral-100">
                          {tool.name}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {tool.description}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-3 text-sm text-neutral-400">
                    Nenhuma ferramenta encontrada.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Nav Desktop */}
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/ferramentas">Ferramentas</NavItem>
            <NavItem to="/sobre">Sobre</NavItem>
            <NavItem to="/termos">Termos</NavItem>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-2 transition hover:bg-neutral-800 md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Drawer Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col gap-8 bg-neutral-950 p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-neutral-50">
                  <Link to="/" onClick={() => setMenuOpen(false)}>
                    <span className="text-blue-400">MChiodi</span>Tools
                  </Link>
                </div>
                <button onClick={() => setMenuOpen(false)}>
                  <X />
                </button>
              </div>

              <form className="flex gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar..."
                  className="flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-neutral-100"
                />
                <button
                  type="button"
                  className="rounded-lg p-2 transition hover:bg-neutral-800"
                >
                  <Search size={18} />
                </button>
              </form>

              <nav className="flex flex-col gap-6 text-lg font-medium">
                <NavItem to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </NavItem>
                <NavItem to="/ferramentas" onClick={() => setMenuOpen(false)}>
                  Ferramentas
                </NavItem>
                <NavItem to="/sobre" onClick={() => setMenuOpen(false)}>
                  Sobre
                </NavItem>
                <NavItem to="/termos" onClick={() => setMenuOpen(false)}>
                  Termos
                </NavItem>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
