import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(){
    try {
        const user = await prisma.user.findMany();

        if (user) {
            return NextResponse.json(user, { status: 200});
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json('erreur dans la récupération des users', { status: 400 })
    }
    
}

export async function POST(req: Request) {

    const body = await req.json();

  const { clerkUserId, name, email, phone, role } = body;

  try {
    const user = await prisma.user.upsert({
      where: {
        clerkUserId,
      },
      update: {
        name,
        email,
        phone,
        role,
      },
      create: {
        clerkUserId,
        name,
        email,
        phone,
        role,
      },
    });

    console.log('Utilisateur inséré ou mis à jour :', user);
    return NextResponse.json(user, { headers: { 'Content-Type': 'application/json'}});
} catch (error) {
  console.error('Erreur lors de la création ou mise à jour de l’utilisateur :', error);
  return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
}
}
