import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params } : { params : {  id: string }}){
    try {
        const user = await prisma.user.findUnique({
            where: {
                params.id
            }
        });
     
    } catch (error) {
        
    }
}