import { prisma } from "./auth";
import type { User , Prisma } from "@prisma/client";

export async function createUserWallet (user:User) {
    try {
        const walletData: Prisma.WalletCreateInput = {
            user : {
                connect : {
                    id : user.id
                }
            } ,
            balance : 1000
        }
        
        const wallet = await prisma.wallet.create({
            data : walletData
        })

        console.log("Wallet created for user:", wallet);

    }  catch (error) {
        console.error("Error creating wallet for user:", error);
    }
}

export async function getWalletBalance (userId:string) : Promise<number | null >{
    try {
        const wallet = await prisma.wallet.findUnique({
            where : {
                userId : userId
            }
        })

        return wallet?.balance || null; 
    } catch (error) {
        console.log("Error fetching wallet balance:", error);
        return null;
    }
}