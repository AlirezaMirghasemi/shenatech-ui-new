import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === "undefined" || !mounted) return null;

  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;

  return createPortal(children, portalRoot);
}
