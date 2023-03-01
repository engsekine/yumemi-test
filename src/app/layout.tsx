import '@/styles/style.css'

export const metadata = {
  title: '株式会社ゆめみフロントエンドコーディング試験',
  description: '株式会社ゆめみフロントエンドコーディング試験です',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
