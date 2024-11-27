import { useEffect, useState } from "react";

export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Met à jour après montage
  }, []);

  return isClient;
};
