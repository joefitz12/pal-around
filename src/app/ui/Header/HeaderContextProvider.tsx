"use client";

import { createContext, useReducer, ReactNode } from "react";

// Define the shape of the context state
interface HeaderState {
  message: React.ReactNode;
  profile?: {
    photo?: string;
    firstName?: string;
    lastName?: string;
  };
}

// Define action types
type HeaderAction =
  | { type: "SET_PROFILE"; payload: HeaderState["profile"] }
  | {
      type: "SET_HEADER";
      payload: {
        message?: HeaderState["message"];
      };
    };

// Reducer function to handle state updates
const headerReducer = (
  state: HeaderState,
  action: HeaderAction
): HeaderState => {
  switch (action.type) {
    case "SET_HEADER":
      return {
        ...state,
        message: action.payload.message || "",
      };
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
};

// Create the HeaderContext with an undefined initial state
export const HeaderContext = createContext<
  | {
      state: HeaderState;
      dispatch: React.Dispatch<HeaderAction>;
    }
  | undefined
>(undefined);

// Create the HeaderContextProvider component
export const HeaderContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(headerReducer, {
    message: "",
    profile: undefined,
  });

  return (
    <HeaderContext.Provider value={{ state, dispatch }}>
      {children}
    </HeaderContext.Provider>
  );
};
