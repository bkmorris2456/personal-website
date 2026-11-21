import { useEffect, useState } from "react";

export default function usePortfolioCollection(read) {
  const [result, setResult] = useState({ state: "loading", items: [] });

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const items = await read();
        if (!ignore) setResult({ state: items.length ? "ready" : "empty", items });
      } catch {
        if (!ignore) setResult({ state: "error", items: [] });
      }
    }
    load();
    return () => { ignore = true; };
  }, [read]);

  return result;
}
