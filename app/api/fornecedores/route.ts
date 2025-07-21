import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  const fornecedores = await prisma.fornecedor.findMany({
    include: { produtos: true }
  })
  return NextResponse.json(fornecedores)
}

export async function POST(request: NextRequest) {
  const { nome, email, telefone, endereco } = await request.json()
  const fornecedor = await prisma.fornecedor.create({
    data: { nome, email, telefone, endereco }
  })
  return NextResponse.json(fornecedor, { status: 201 })
}