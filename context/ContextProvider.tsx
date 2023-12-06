import { Redirect, usePathname } from "expo-router";
import { useEffect, useState } from "react";

import { SessionContext } from "~/context/session";
import { User } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const pathname = usePathname();

  async function fetchUser() {
    console.log("Checking currently logged in user...");
    const res = await apiFetch<User>(`/auth`);

    if (!res.data || !res.data.id || res.error) {
      console.log("No logged-in user, session user is null!");
      setUser(null);
    } else {
      console.log(`Session user is valid - email: ${res.data.email}, id: ${res.data.id}`);
      setUser(res.data);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {process.env.EXPO_PUBLIC_BYPASS_AUTH !== "true" &&
        user === null &&
        !pathname.startsWith("/welcome") && <Redirect href="/welcome" />}
      {user?.id && pathname.startsWith("/welcome") && <Redirect href="/" />}
      {children}
    </SessionContext.Provider>
  );
}
