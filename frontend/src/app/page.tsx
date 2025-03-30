import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ Home ~ session:", session)
  return (
    <main >
      <Link className="mr-2" href={'/signup'}>SignUp</Link>
      <Link href={'/login'}>Login</Link>
    </main>
  );
}
