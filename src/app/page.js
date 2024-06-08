'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  const explanationCards = [
    {
      title: "What is Classify Emails?",
      description: "Classify Emails is a tool that helps you categorize your emails into different types such as Important, Promotions, Social, Marketing, Spam, and General."
    },
    {
      title: "How Does It Work?",
      description: "Simply provide your email snippet and our advanced AI model will analyze and categorize it based on its content."
    },
    {
      title: "Why Use Classify Emails?",
      description: "Organize your inbox, prioritize important emails, and keep track of promotions, social updates, and more."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Classify Emails Welcomes You</h1>
      {session ? (
        <>
          <p className="text-2xl mb-4">Welcome, {session.user.name}!</p>
          <img
            src={session.user.image}
            alt={`${session.user.name}'s profile picture`}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => signOut()}
            className="mb-4"
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <p className="text-xl mb-4">You are not logged in.</p>
          <Link href="/login">
            <Button variant="contained" color="primary" className="mb-4">
              Login
            </Button>
          </Link>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-8">
        {explanationCards.map((card, index) => (
          <Card key={index} className="shadow-lg">
            <CardContent>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <Link href="/temp">
        <Button variant="contained" color="secondary">
          Classify Your Emails
        </Button>
      </Link>
    </div>
  );
}
