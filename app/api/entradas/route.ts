import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  const entradas = await prisma.entrada.findMany({
    include: { produto: { include: { fornecedor: true } } }
  })
  return NextResponse.json(entradas)
}

export async function POST(request: NextRequest) {
  const { quantidade, produtoId } = await request.json()
  const entrada = await prisma.entrada.create({
    data: { quantidade, produtoId }
  })
  return NextResponse.json(entrada, { status: 201 })
}