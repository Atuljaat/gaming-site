import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  emailAndPassword :{
    enabled: true,
  } ,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders : {
    google : {
      clientId : process.env.GOOGLE_CLIENT_ID as string,
      clientSecret : process.env.GOOGLE_CLIENT_SECRET as string,
    } , 
    discord : {
      clientId : process.env.DISCORD_CLIENT_ID as string,
      clientSecret : process.env.DISCORD_CLIENT_SECRET as string,
    }
  }
});