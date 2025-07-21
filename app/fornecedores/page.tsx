'use client'

import { useState, useEffect } from 'react'

interface Fornecedor {
  id: string
  nome: string
  email: string
  telefone: string
  endereco: string
}

export default function FornecedoresPage() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: ''
  })

  useEffect(() => {
    fetchFornecedores()
  }, [])

  const fetchFornecedores = async () => {
    const response = await fetch('/api/fornecedores')
    const data = await response.json()
    setFornecedores(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      await fetch(`/api/fornecedores/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    } else {
      await fetch('/api/fornecedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    }
    setFormData({ nome: '', email: '', telefone: '', endereco: '' })
    setShowForm(false)
    setEditingId(null)
    fetchFornecedores()
  }

  const handleEdit = (fornecedor: Fornecedor) => {
    setFormData({
      nome: fornecedor.nome,
      email: fornecedor.email,
      telefone: fornecedor.telefone,
      endereco: fornecedor.endereco
    })
    setEditingId(fornecedor.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/fornecedores/${id}`, { method: 'DELETE' })
    fetchFornecedores()
  }

  const handleCancel = () => {
    setFormData({ nome: '', email: '', telefone: '', endereco: '' })
    setShowForm(false)
    setEditingId(null)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Fornecedores</h1>
        <button onClick={() => showForm ? handleCancel() : setShowForm(true)}>
          {showForm ? 'Cancelar' : 'Novo Fornecedor'}
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
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            placeholder="Telefone"
            value={formData.telefone}
            onChange={(e) => setFormData({...formData, telefone: e.target.value})}
            required
          />
          <input
            placeholder="Endereço"
            value={formData.endereco}
            onChange={(e) => setFormData({...formData, endereco: e.target.value})}
            required
          />
          <button type="submit">{editingId ? 'Atualizar' : 'Salvar'}</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.id}>
              <td>{fornecedor.nome}</td>
              <td>{fornecedor.email}</td>
              <td>{fornecedor.telefone}</td>
              <td>{fornecedor.endereco}</td>
              <td>
                <button onClick={() => handleEdit(fornecedor)}>
                  Editar
                </button>
                <button onClick={() => handleDelete(fornecedor.id)}>
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