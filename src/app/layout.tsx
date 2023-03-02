import "@/styles/style.scss"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "株式会社ゆめみフロントエンドコーディング試験",
  description: "株式会社ゆめみフロントエンドコーディング試験です",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={inter.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
