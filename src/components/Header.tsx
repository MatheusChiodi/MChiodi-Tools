import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

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

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 z-50 flex w-full max-w-screen-xl items-center justify-between border-b border-neutral-800 px-4 py-4 backdrop-blur-md sm:px-6`}
      >
        <div className="cursor-pointer text-2xl font-extrabold tracking-tight text-neutral-50">
          <Link to="/">
            <span className="text-blue-400">MChiodi</span>Tools
          </Link>
        </div>

        <div className="relative flex items-center gap-4">
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/ferramentas">Ferramentas</NavItem>
            <NavItem to="/sobre">Sobre</NavItem>
            <NavItem to="/termos">Termos</NavItem>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-2 transition hover:bg-neutral-800 md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

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
