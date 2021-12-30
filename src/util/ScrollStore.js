import React, { createContext } from "react";
import useScroll from "./useScroll";
import useWindowSize from "./useWindowSize";

const ScrollStore = ({ children }) => {
  const windowSize = useWindowSize();
  const scroll = useScroll();

  return (
    <ScrollContext.Provider value={{ windowSize, scroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const ScrollContext = createContext(null);
export default ScrollStore;
