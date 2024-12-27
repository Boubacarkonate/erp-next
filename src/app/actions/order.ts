"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllOrders = async () =>{
    try {
        const orders = await prisma.order.findMany({});
        return orders;
    } catch (error) {
        console.error("erreur dans la récupération des commandes : ", error);
        throw new Error("Erreur interne du serveur.");
    }
}

export const getOneOrder = async (id: number) => {
    if (!id || typeof id !== "number") {
        throw new Error("Un ID valide doit être fourni pour récupérer un produit.");
    }

    try {
        const one_order = await prisma.order.findUnique({
            where: {
                id
            },
        });

        if (!one_order) {
            throw new Error("Produit non trouvé pour l'ID donné.");
          }

          return one_order;

        } catch (error) {
            console.error("Erreur lors de la récupération du produit :", error);
            throw new Error("Erreur interne du serveur.");
          }
}

export async function upsertOrder(data: {
    id: number,
    quantity: number,
    total: number,
    userId: number,
    productId: number,
    factureId?: number
}){
    const { id, quantity, total, userId, productId, factureId } = data;

    try {
        const order = await prisma.order.upsert({
            where: { id },
            create: {
                id, 
                quantity, 
                total, 
                userId, 
                productId, 
                factureId: factureId || null
            },
            update: { 
                id, 
                quantity, 
                total, 
                userId, 
                productId, 
                factureId: 
                factureId || null 
            }
        });
        
        return order;

    } catch (error) {
        console.error("Erreur lors de la création ou mise à jour de la commande :", error);
        throw new Error("Erreur interne du serveur.");
      }
    }