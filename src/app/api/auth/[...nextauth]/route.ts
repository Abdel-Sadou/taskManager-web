import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                 token.id_token = account.id_token;
            }
            return token;
        },
        async session({ session, token }) {
            (session.id_token as string) = token.id_token as string;
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Si l'utilisateur se connecte avec succès, rediriger vers la page d'accueil ou une page spécifique
            console.warn("I am redirect ", url)
            return baseUrl; // rediriger vers la page principale
        },
    },
});

export { handler as GET, handler as POST };