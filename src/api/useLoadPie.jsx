import { useEffect, useState } from "react";

export default function useLoadPie(userId) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setError(null);
      setItems(null);
      setIsLoading(true);

      try {
        const res = await fetch(`https://softwarehub.uk/unibase/was/api/teaching/users/${userId}`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status} – ${res.statusText}`);
        const json = await res.json();
        if (!cancelled) setItems(json);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to fetch");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { items, error, isLoading };
}
