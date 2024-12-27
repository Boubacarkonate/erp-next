"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    throw new Error("Erreur interne du serveur.");
  }
}

export async function getOneProduct(id: number) {
  if (!id || typeof id !== "number") {
    throw new Error("Un ID valide doit être fourni pour récupérer un produit.");
  }

  try {
    const one_product = await prisma.product.findUnique({
      where: { id },
    });

    if (!one_product) {
      throw new Error("Produit non trouvé pour l'ID donné.");
    }

    return one_product;
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    throw new Error("Erreur interne du serveur.");
  }
}

export async function upsertProduct(data: {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  userId?: number;
}) {
  const { id, name, description, price, stock, userId } = data;

  if (!name || typeof name !== "string") {
    throw new Error("Le champ 'name' est obligatoire et doit être une chaîne de caractères.");
  }
  if (price === undefined || typeof price !== "number" || price <= 0) {
    throw new Error("Le champ 'price' est obligatoire et doit être un nombre positif.");
  }
  if (stock === undefined || typeof stock !== "number") {
    throw new Error("Le champ 'stock' est obligatoire et doit être un entier non négatif.");
  }
  if (userId && typeof userId !== "number") {
    throw new Error("Le champ 'userId' doit être un entier valide.");
  }

  try {
    if (userId) {
      const userExists = await prisma.user.findUnique({ where: { id: userId } });
      if (!userExists) {
        throw new Error("L'utilisateur spécifié n'existe pas.");
      }
    }

    const product = await prisma.product.upsert({
      where: { id: id || 0 },
      create: { name, description: description || null, price, stock, userId },
      update: { name, description: description || null, price, stock, userId },
    });

    return product;
  } catch (error) {
    console.error("Erreur lors de la création ou mise à jour du produit :", error);
    throw new Error("Erreur interne du serveur.");
  }
}

export async function DeleteProduct(id: number) {
  if (typeof id !== "number") {
    throw new Error("Un ID valide doit être fourni pour supprimer un produit.");
  }

  try {
    const productToDelete = await prisma.product.delete({
      where: { id },
    });
    return productToDelete;
  } catch (error: any) {
    console.error("Erreur lors de la suppression du produit :", error);

    if (error.code === "P2025") {
      throw new Error("Aucun produit correspondant trouvé pour cet ID.");
    }

    throw new Error("Erreur interne du serveur.");
  } finally {
    await prisma.$disconnect(); // Bonne pratique pour fermer la connexion
  }
}



// export async function addTest(formData: FormData) {
//   try {
//     // Extraction et validation des données
//     const name = formData.get("name")?.toString();
//     const description = formData.get("description")?.toString();
//     const price = parseFloat(formData.get("price")?.toString() || "0");
//     const stock = parseInt(formData.get("stock")?.toString() || "0", 10);
//     const userId = parseInt(formData.get("userId")?.toString() || "0", 10);

//     if (!name || name.trim() === "") {
//       throw new Error("Le champ 'Nom' est obligatoire.");
//     }
//     if (!description || description.trim() === "") {
//       throw new Error("Le champ 'Description' est obligatoire.");
//     }
//     if (isNaN(price) || price <= 0) {
//       throw new Error("Le champ 'Prix' doit être un nombre positif.");
//     }
//     if (isNaN(stock) || stock < 0) {
//       throw new Error("Le champ 'Stock' doit être un entier non négatif.");
//     }

//     // Création du produit avec Prisma
//     const product = await prisma.product.create({
//       data: {
//         name,
//         description,
//         price,
//         stock,
//         userId
//       },
//     });

//     console.log("Produit ajouté :", product);
//     return { success: true, product };
//   } catch (error) {
//     console.error("Erreur lors de l'ajout du produit :", error);
//     throw new Error("Erreur interne du serveur. Impossible d'ajouter le produit.");
//   }
// }

export async function addTest(formData: FormData) {
  try {
    // Extraction et validation des données
    const id = formData.get("id") ? parseInt(formData.get("id")?.toString() || "0", 10) : undefined;
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const stock = parseInt(formData.get("stock")?.toString() || "0", 10);
    const userId = parseInt(formData.get("userId")?.toString() || "0", 10);

    if (!name || name.trim() === "") {
      throw new Error("Le champ 'Nom' est obligatoire.");
    }
    if (!description || description.trim() === "") {
      throw new Error("Le champ 'Description' est obligatoire.");
    }
    if (isNaN(price) || price <= 0) {
      throw new Error("Le champ 'Prix' doit être un nombre positif.");
    }
    if (isNaN(stock) || stock < 0) {
      throw new Error("Le champ 'Stock' doit être un entier non négatif.");
    }

    // Création ou mise à jour du produit avec Prisma
    const product = await prisma.product.upsert({
      where: { id: id || 0 }, // Si `id` est défini, chercher l'enregistrement à mettre à jour
      update: {
        name,
        description,
        price,
        stock,
        userId,
      },
      create: {
        name,
        description,
        price,
        stock,
        userId,
      },
    });

    console.log("Produit ajouté ou mis à jour :", product);
    return { success: true, product };
  } catch (error) {
    console.error("Erreur lors de l'ajout ou de la mise à jour du produit :", error);
    throw new Error("Erreur interne du serveur. Impossible d'ajouter ou de mettre à jour le produit.");
  }
}
