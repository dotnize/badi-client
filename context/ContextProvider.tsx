import { useEffect, useState } from "react";

import { SessionContext } from "~/context/session";
import { User } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | "loading">("loading");

  async function fetchUser() {
    const res = await apiFetch<User>(`/auth`);

    if (!res.data?.id || res.error) {
      setUser(null);
    } else {
      setUser(res.data);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return <SessionContext.Provider value={{ user, setUser }}>{children}</SessionContext.Provider>;
}
