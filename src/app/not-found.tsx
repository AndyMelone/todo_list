import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page non trouvée - TODOAPP",
  description:
    "La page que vous recherchez est introuvable. Retournez à la page d'accueil de TODOAPP.",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  keywords: ["404", "Page non trouvée", "TODOAPP", "Erreur 404"],
  twitter: {
    card: "summary",
    title: "Page non trouvée - TODOAPP",
    description:
      "La page que vous recherchez n'existe pas. Retournez à la page principale de TODOAPP.",
    creator: "@TODOAPP",
    site: "@TODOAPP",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": 0,
      "max-image-preview": "none",
      "max-snippet": 0,
    },
  },
};

export default function NotFound() {
  return (
    <div className="m-auto space-y-5 text-center">
      <h1 className="text-3xl font-bold">Not Found</h1>
      <p>Looks like this page doesn&apos;t exist.</p>
    </div>
  );
}
