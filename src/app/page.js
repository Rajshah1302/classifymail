import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (!session) {
    redirect("/api/auth/signin");
  }
  else{
    // console.log(session)
    // console.log(session.)
  }
  return (
    <>
    <h1>Home Page</h1> <img src = {session.user.image}></img>
    </>
  );
}
