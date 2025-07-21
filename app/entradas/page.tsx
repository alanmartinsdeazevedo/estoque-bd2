'use client'

import { useState, useEffect } from 'react'

interface Entrada {
  id: string
  quantidade: number
  dataEntrada: string
  produto: {
    id: string
    nome: string
    fornecedor: { nome: string }
  }
}

interface Produto {
  id: string
  nome: string
}

export default function EntradasPage() {
  const [entradas, setEntradas] = useState<Entrada[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    quantidade: 0,
    produtoId: ''
  })

  useEffect(() => {
    fetchEntradas()
    fetchProdutos()
  }, [])

  const fetchEntradas = async () => {
    const response = await fetch('/api/entradas')
    const data = await response.json()
    setEntradas(data)
  }

  const fetchProdutos = async () => {
    const response = await fetch('/api/produtos')
    const data = await response.json()
    setProdutos(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      await fetch(`/api/entradas/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    } else {
      await fetch('/api/entradas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    }
    setFormData({ quantidade: 0, produtoId: '' })
    setShowForm(false)
    setEditingId(null)
    fetchEntradas()
  }

  const handleEdit = (entrada: Entrada) => {
    setFormData({
      quantidade: entrada.quantidade,
      produtoId: entrada.produto.id
    })
    setEditingId(entrada.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/entradas/${id}`, { method: 'DELETE' })
    fetchEntradas()
  }

  const handleCancel = () => {
    setFormData({ quantidade: 0, produtoId: '' })
    setShowForm(false)
    setEditingId(null)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Entradas de Estoque</h1>
        <button onClick={() => showForm ? handleCancel() : setShowForm(true)}>
          {showForm ? 'Cancelar' : 'Nova Entrada'}
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Quantidade"
            type="number"
            value={formData.quantidade}
            onChange={(e) => setFormData({...formData, quantidade: parseInt(e.target.value)})}
            required
          />
          <select
            value={formData.produtoId}
            onChange={(e) => setFormData({...formData, produtoId: e.target.value})}
            required
          >
            <option value="">Selecione um produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
          <button type="submit">{editingId ? 'Atualizar' : 'Salvar'}</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Fornecedor</th>
            <th>Quantidade</th>
            <th>Data de Entrada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {entradas.map((entrada) => (
            <tr key={entrada.id}>
              <td>{entrada.produto.nome}</td>
              <td>{entrada.produto.fornecedor.nome}</td>
              <td>{entrada.quantidade}</td>
              <td>{new Date(entrada.dataEntrada).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(entrada)}>
                  Editar
                </button>
                <button onClick={() => handleDelete(entrada.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}