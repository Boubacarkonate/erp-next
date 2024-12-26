import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getAuth } from "@clerk/nextjs/server"; // Clerk pour récupérer l'utilisateur authentifié

const prisma = new PrismaClient();

// export async function GET(){
//     try {
//         const user = await prisma.user.findMany();

//         if (user) {
//             return NextResponse.json(user, { status: 200});
//         }
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json('erreur dans la récupération des users', { status: 400 })
//     }
    
// }




// Route pour récupérer tous les utilisateurs
export async function GET(req: Request) {
  try {
    // Récupérer l'utilisateur authentifié via Clerk
    const { userId } = getAuth(req);

    // Vérifier si l'utilisateur est authentifié
    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Non authentifié" }), { status: 401 });
    }

    // Récupérer tous les utilisateurs dans la base de données
    const users = await prisma.user.findMany();

    // Vérifier si des utilisateurs existent
    if (users.length === 0) {
      return new NextResponse(JSON.stringify({ message: "Aucun utilisateur trouvé" }), { status: 404 });
    }

    // Retourner les utilisateurs
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs", error);
    return new NextResponse(JSON.stringify({ error: "Erreur interne du serveur" }), { status: 500 });
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
