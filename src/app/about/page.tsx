import Link from "next/link";

export default function Page(){
    return (
        <main className="p-6">
            <h1 className="text-2xl">À propos</h1>
            <p>Cette app est un exemple avec Next.js</p>
            <Link href="/" className="text-blue-500 underline">Retour à l&apos;accueil</Link>
        </main>
    )
}