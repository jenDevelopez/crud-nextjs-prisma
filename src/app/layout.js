import { Lato } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Footer from "@/components/footer";

const lato = Lato({
  weight: ["400","700"],
  style: "normal",
  subsets: ["latin"],
}
)

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${lato.className} bg-image bg-fixed h-screen w-screen bg-cover`}>

        <nav className="p-4 mb-2 shadow-xl  ">
          <Link className="text-2xl font-bold" href="/">Mis Notas ✍️</Link>
        </nav>
        <main className="">{children}</main></body>
     
    </html>
  );
}
