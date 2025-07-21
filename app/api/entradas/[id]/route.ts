import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const entrada = await prisma.entrada.findUnique({
    where: { id },
    include: { produto: { include: { fornecedor: true } } }
  })
  if (!entrada) {
    return NextResponse.json({ message: 'Entrada not found' }, { status: 404 })
  }
  return NextResponse.json(entrada)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { quantidade, produtoId } = await request.json()
  const entrada = await prisma.entrada.update({
    where: { id },
    data: { quantidade, produtoId }
  })
  return NextResponse.json(entrada)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.entrada.delete({ where: { id } })
  return new NextResponse(null, { status: 204 })
}