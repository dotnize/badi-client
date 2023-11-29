import { useContext } from "react";

import { SessionContext } from "~/context/session";

export const useSession = () => {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error("useSession must be used within a SessionContext.Provider");
  } // already in the root layout, so this should never happen

  return context;
};
