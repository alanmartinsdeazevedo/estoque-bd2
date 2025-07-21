import Link from "next/link"

export default function HomePage() {
  return (
    <div>
      <h1>Sistema de Estoque</h1>
      <p>Gerenciamento de fornecedores, produtos e entradas.</p>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <Link 
          href="/fornecedores" 
          style={{ 
            padding: '15px 30px', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'block',
            textAlign: 'center'
          }}
        >
          Fornecedores
        </Link>
        
        <Link 
          href="/produtos" 
          style={{ 
            padding: '15px 30px', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'block',
            textAlign: 'center'
          }}
        >
          Produtos
        </Link>
        
        <Link 
          href="/entradas" 
          style={{ 
            padding: '15px 30px', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'block',
            textAlign: 'center'
          }}
        >
          Entradas
        </Link>
      </div>
    </div>
  )
}