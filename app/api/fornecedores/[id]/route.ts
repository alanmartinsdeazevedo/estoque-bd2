import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const fornecedor = await prisma.fornecedor.findUnique({
    where: { id },
    include: { produtos: true }
  })
  if (!fornecedor) {
    return NextResponse.json({ message: 'Fornecedor not found' }, { status: 404 })
  }
  return NextResponse.json(fornecedor)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { nome, email, telefone, endereco } = await request.json()
  const fornecedor = await prisma.fornecedor.update({
    where: { id },
    data: { nome, email, telefone, endereco }
  })
  return NextResponse.json(fornecedor)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.fornecedor.delete({ where: { id } })
  return new NextResponse(null, { status: 204 })
}