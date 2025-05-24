import { Header } from "./Header";
import { Footer } from "./Footer";
import { Loader } from "./Loader";
import { BackToTop } from "./BackToTop";
import { useState, useEffect } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="max-w-screen-xl mx-auto">
          <Header />
          <main className="mx-auto max-w-7xl mt-28">{children}</main>
          <Footer />
          <BackToTop />
        </div>
      )}
    </>
  );
}
