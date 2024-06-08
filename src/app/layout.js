import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import AuthProvider from "./utils/SessionProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Classify Emails",
  description: "An application to classify email snippets using AI",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
