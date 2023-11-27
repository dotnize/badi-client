import { useEffect, useReducer, useRef } from "react";

import { API_URL } from "~/lib/config";

interface State<T> {
  data?: T;
  error?: Error;
}

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

// derived from https://usehooks-ts.com/react-hook/use-fetch

export function useFetch<T = unknown>(endpoint?: string, options?: RequestInit): State<T> {
  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!endpoint) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${API_URL}${endpoint}`, options);

        const json = await res.json();

        if (!res.ok || json?.error) {
          throw new Error(json?.message || res.statusText);
        }
        const data = json as T;

        if (cancelRequest.current) return;
        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        if (cancelRequest.current) return;
        dispatch({ type: "error", payload: error as Error });
      }
    };

    fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return state;
}
