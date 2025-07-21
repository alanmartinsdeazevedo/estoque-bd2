'use client'

import { useState, useEffect } from 'react'

interface Produto {
  id: string
  nome: string
  descricao: string
  preco: number
  categoria: string
  fornecedorId: string
  fornecedor: { id: string; nome: string }
}

interface Fornecedor {
  id: string
  nome: string
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: 0,
    categoria: '',
    fornecedorId: ''
  })

  useEffect(() => {
    fetchProdutos()
    fetchFornecedores()
  }, [])

  const fetchProdutos = async () => {
    const response = await fetch('/api/produtos')
    const data = await response.json()
    setProdutos(data)
  }

  const fetchFornecedores = async () => {
    const response = await fetch('/api/fornecedores')
    const data = await response.json()
    setFornecedores(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      await fetch(`/api/produtos/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    } else {
      await fetch('/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    }
    setFormData({ nome: '', descricao: '', preco: 0, categoria: '', fornecedorId: '' })
    setShowForm(false)
    setEditingId(null)
    fetchProdutos()
  }

  const handleEdit = (produto: Produto) => {
    setFormData({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      categoria: produto.categoria,
      fornecedorId: produto.fornecedorId
    })
    setEditingId(produto.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/produtos/${id}`, { method: 'DELETE' })
    fetchProdutos()
  }

  const handleCancel = () => {
    setFormData({ nome: '', descricao: '', preco: 0, categoria: '', fornecedorId: '' })
    setShowForm(false)
    setEditingId(null)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Produtos</h1>
        <button onClick={() => showForm ? handleCancel() : setShowForm(true)}>
          {showForm ? 'Cancelar' : 'Novo Produto'}
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nome"
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
            required
          />
          <input
            placeholder="Descrição"
            value={formData.descricao}
            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
            required
          />
          <input
            placeholder="Preço"
            type="number"
            step="0.01"
            value={formData.preco}
            onChange={(e) => setFormData({...formData, preco: parseFloat(e.target.value)})}
            required
          />
          <input
            placeholder="Categoria"
            value={formData.categoria}
            onChange={(e) => setFormData({...formData, categoria: e.target.value})}
            required
          />
          <select
            value={formData.fornecedorId}
            onChange={(e) => setFormData({...formData, fornecedorId: e.target.value})}
            required
          >
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.nome}
              </option>
            ))}
          </select>
          <button type="submit">{editingId ? 'Atualizar' : 'Salvar'}</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Fornecedor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
              <td>{produto.categoria}</td>
              <td>{produto.fornecedor.nome}</td>
              <td>
                <button onClick={() => handleEdit(produto)}>
                  Editar
                </button>
                <button onClick={() => handleDelete(produto.id)}>
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