import { Dispatch, SetStateAction, createContext } from "react";

import type { User } from "~/lib/types";

export const SessionContext = createContext<
  | {
      // null = no user found after checking/loading
      user: User | null | "loading";
      setUser: Dispatch<SetStateAction<User | null | "loading">>;
    }
  | undefined
>(undefined);
