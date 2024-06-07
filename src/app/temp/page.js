"use client";
import { useSession } from "next-auth/react";
import Mails from "../components/mails";
import { redirect } from "next/navigation";
import "./temp.css";
import Profile from "../components/profile";
import { useState } from "react";
import { Box } from "@mui/material";
import Card from "../components/mailCard";
function Component() {
  const { data: session } = useSession();
  const [maxMails, setMaxMails] = useState(5);
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div class="container mx-auto px-40 py-5">
        <Profile session={session} />
        <Mails maxMails={maxMails} session={session} />
      </div>
    </>
  );
}

export default Component;
