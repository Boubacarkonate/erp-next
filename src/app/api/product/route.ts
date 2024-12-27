import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){
    try {
        const products = await prisma.product.findMany();
        if (products) {
            return NextResponse.json(products, {status: 200});
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json("erreur dans la récupération des produits", {status: 400});
    }

}

export async function POST(req: Request) {
  try {
    // Récupération et validation des données entrantes
    const body = await req.json();
    const { id, name, description, price, stock, userId } = body;

    // Validation des champs
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Le champ 'name' est obligatoire et doit être une chaîne de caractères." },
        { status: 400 }
      );
    }
    if (price === undefined || typeof price !== "number" || price <= 0) {
      return NextResponse.json(
        { error: "Le champ 'price' est obligatoire et doit être un nombre positif." },
        { status: 400 }
      );
    }
    if (stock === undefined || typeof stock !== "number") {
      return NextResponse.json(
        { error: "Le champ 'stock' est obligatoire et doit être un entier non négatif." },
        { status: 400 }
      );
    }
    if (userId && typeof userId !== "number") {
      return NextResponse.json(
        { error: "Le champ 'userId' doit être un entier valide." },
        { status: 400 }
      );
    }

    // Vérification si `userId` correspond à un utilisateur existant (si fourni)
    if (userId) {
      const userExists = await prisma.user.findUnique({ where: { id: userId } });
      if (!userExists) {
        return NextResponse.json(
          { error: "L'utilisateur spécifié n'existe pas." },
          { status: 404 }
        );
      }
    }

    // Création ou mise à jour du produit avec Prisma `upsert`
    const product = await prisma.product.upsert({
      where: { id: id || 0 }, // Utilise l'ID si fourni, sinon 0 (aucun produit trouvé -> création)
      update: {
        name,
        description: description || null, // Champ optionnel
        price,
        stock,
        userId,
      },
      create: {
        name,
        description: description || null,
        price,
        stock,
        userId,
      },
    });

    // Retour de la réponse avec le produit créé ou mis à jour
    return NextResponse.json(product, {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erreur lors de la création ou mise à jour du produit :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Optionnel : Fermer la connexion Prisma
  }
}
