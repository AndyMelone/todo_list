import { useState, useEffect } from "react";
import { useIsClient } from "./useIsClient";

const useWindowSize = () => {
  const isClient = useIsClient();

  // Valeurs par défaut initiales pour éviter les erreurs côté serveur
  const [windowSize, setWindowSize] = useState({
    width: 0, // Valeurs par défaut sûres
    height: 0,
  });

  useEffect(() => {
    if (!isClient) return; // Ne s'exécute pas côté serveur

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Définir la taille initiale au montage
    handleResize();

    // Ajouter l'écouteur d'événements
    window.addEventListener("resize", handleResize);

    // Nettoyage de l'écouteur lors du démontage
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]); // Dépendance à `isClient`

  return windowSize;
};

export default useWindowSize;
