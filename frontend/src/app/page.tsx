import Link from "next/link";

export default function Home() {
  return (
    <main >
      <Link className="mr-2" href={'/signup'}>SignUp</Link>
      <Link href={'/login'}>Login</Link>
    </main>
  );
}
