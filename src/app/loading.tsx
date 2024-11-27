import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chargement - Mon Application",
  description: "Veuillez patienter pendant le chargement de la page.",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  keywords: ["Chargement", "Mon application", "Next.js"],
};

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="loader"></div>
        <p className="mt-5 text-lg font-semibold text-gray-700">
          Chargement...
        </p>
      </div>
    </div>
  );
}
