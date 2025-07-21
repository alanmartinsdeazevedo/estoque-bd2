import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  const produtos = await prisma.produto.findMany({
    include: { fornecedor: true, entradas: true }
  })
  return NextResponse.json(produtos)
}

export async function POST(request: NextRequest) {
  const { nome, descricao, preco, categoria, fornecedorId } = await request.json()
  const produto = await prisma.produto.create({
    data: { nome, descricao, preco, categoria, fornecedorId }
  })
  return NextResponse.json(produto, { status: 201 })
}