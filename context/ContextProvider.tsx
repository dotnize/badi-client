import { useEffect, useState } from "react";

import { SessionContext } from "~/context/session";
import { API_URL } from "~/lib/config";
import { User } from "~/lib/types";

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | "loading">("loading");

  async function fetchUser() {
    const res = await fetch(`${API_URL}/auth`);
    if (!res.ok) return setUser(null);

    const data = await res.json();
    // TODO: put all fetches in "api" folder? then error handling
    if (!data?.id) {
      setUser(null); // refetch if !res.ok?
    } else {
      setUser(data);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return <SessionContext.Provider value={{ user, setUser }}>{children}</SessionContext.Provider>;
}
