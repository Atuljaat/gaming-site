import {auth} from "@/app/lib/auth"
import { prisma } from "@/app/lib/auth"
import { headers } from "next/headers";

export async function GET (request:Request) {
    const session = await auth.api.getSession({
        headers : request.headers
    })

    const userId = session?.user?.id;

    if (!userId) {
        return new Response(JSON.stringify({error : 'Unauthorized'}), {status : 401});
    }

    const wallet = await prisma.wallet.findUnique({
        where : {
            userId : userId
        }
    })

    if (!wallet) {
        return new Response(JSON.stringify({error : 'Wallet not found'}), {status : 404});
    }

    return new Response(JSON.stringify({balance : wallet.balance }), {status : 200});
}
