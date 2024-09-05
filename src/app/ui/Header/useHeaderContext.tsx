import { useContext } from "react";
import { HeaderContext } from "./HeaderContextProvider";

// Custom hook for consuming the context and updating the state
export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error(
      "useHeaderContext must be used within a HeaderContextProvider"
    );
  }

  return context;
};
