import { useState, useEffect } from "react";
import { useIsClient } from "./useIsClient";

const useWindowSize = () => {
  const isClient = useIsClient();

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  return windowSize;
};

export default useWindowSize;
