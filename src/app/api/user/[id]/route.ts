import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Recherche d'un utilisateur par ID
    const one_user = await prisma.user.findUnique({
      where: {
        clerkUserId: params.id, // Correctement lié au champ "id" du modèle Prisma
      },
    });

    // Si aucun utilisateur n'est trouvé
    if (!one_user) {
  return NextResponse.json({message: "ID de clerk non trouvé"} ,{ status: 404})
    }

    // Retourner l'utilisateur trouvé
    return NextResponse.json(one_user, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return NextResponse.json({message: "erreur serveur"} ,{ status: 500})
    }
  
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {

    try {
        const userToDelete = await prisma.user.delete({

            where: {
                clerkUserId: params.id,
            }
           }) 
           return NextResponse.json({ message: `utilsateur ${userToDelete.clerkUserId} est supprimé avec succès de Clerk`}, { status: 200 })
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
            return NextResponse.json({message: "erreur serveur"} ,{ status: 500})
            }
   

};

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
      // Vérification de l'ID dans les paramètres
      const { id } = params;
      if (!id || typeof id !== "string") {
        return NextResponse.json({ message: "ID introuvable ou invalide" }, { status: 400 });
      }
  
      // Récupération des données envoyées dans la requête
      const body = await req.json();
      const { name, email, phone, role } = body;
  
      // Vérification des champs à mettre à jour
      if (!name && !email && !phone && !role) {
        return NextResponse.json({ message: "Aucun champ valide à mettre à jour" }, { status: 400 });
      }
  
      // Mise à jour de l'utilisateur
      const updatedUser = await prisma.user.update({
        where: { clerkUserId: id }, // Met à jour l'utilisateur via `clerkUserId`
        data: {
          ...(name && { name }),
          ...(email && { email }),
          ...(phone && { phone }),
          ...(role && { role }),
        },
      });
  
      // Retour de la réponse avec l'utilisateur mis à jour
      return NextResponse.json(
        { message: "Utilisateur mis à jour avec succès", user: updatedUser },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
  
      // Gestion spécifique des erreurs Prisma (exemple : utilisateur non trouvé)
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
      }
  
      // Erreur interne du serveur
      return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    } finally {
      await prisma.$disconnect(); // Ferme la connexion Prisma
    }
  }