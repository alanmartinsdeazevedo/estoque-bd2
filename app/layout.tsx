import Link from "next/link"
import "./globals.css"

export const metadata = {
  title: 'Sistema de Estoque',
  description: 'Controle de estoque com Next.js e MongoDB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
            <Link href="/" style={{ marginRight: '15px' }}>Início</Link>
            <Link href="/fornecedores" style={{ marginRight: '15px' }}>Fornecedores</Link>
            <Link href="/produtos" style={{ marginRight: '15px' }}>Produtos</Link>
            <Link href="/entradas" style={{ marginRight: '15px' }}>Entradas</Link>
            <Link href="/sobre" style={{ marginRight: '15px' }}>Sobre</Link>
            <a href="/api/fornecedores" style={{ marginRight: '15px' }}>API</a>
          </nav>
        </header>
        <main style={{ padding: '20px' }}>
          {children}
        </main>
        <footer style={{ padding: '20px', borderTop: '1px solid #ccc' }}>
          <span>Sistema de Estoque - Banco de Dados II</span>
        </footer>
      </body>
    </html>
  )
}