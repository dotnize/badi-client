import { Dispatch, SetStateAction, createContext } from "react";

import type { User } from "~/lib/types";

export const SessionContext = createContext<
  | {
      // null = no user found after checking/loading
      // undefined = loading/still checking
      user: User | null | undefined;
      setUser: Dispatch<SetStateAction<User | null | undefined>>;
    }
  | undefined
>(undefined);
