import NavBar from "./NavBar";
import "./globals.css";

export const metadata = {
  title: "iPiT",
  description: "iPiT inversored de proyectos IT conecta inversores con programadores y diseñadores para llevar a cabo proyectos de software y diseño web.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
