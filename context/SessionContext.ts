import { Dispatch, SetStateAction, createContext } from "react";

import type { User } from "~/lib/types";

export const SessionContext = createContext<
  | {
      user: User | null;
      setUser: Dispatch<SetStateAction<User | null>>;
    }
  | undefined
>(undefined);
