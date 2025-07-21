import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const produto = await prisma.produto.findUnique({
    where: { id },
    include: { fornecedor: true, entradas: true }
  })
  if (!produto) {
    return NextResponse.json({ message: 'Produto not found' }, { status: 404 })
  }
  return NextResponse.json(produto)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { nome, descricao, preco, categoria, fornecedorId } = await request.json()
  const produto = await prisma.produto.update({
    where: { id },
    data: { nome, descricao, preco, categoria, fornecedorId }
  })
  return NextResponse.json(produto)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.produto.delete({ where: { id } })
  return new NextResponse(null, { status: 204 })
}