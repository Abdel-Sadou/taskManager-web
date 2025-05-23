import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        id_token?: string;
    }

    interface JWT {
        id_token?: string;
    }
}
