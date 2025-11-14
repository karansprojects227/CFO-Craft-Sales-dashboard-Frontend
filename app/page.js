// app/page.js
import { redirect } from "next/navigation";

export default function Home() {
  // root "/" visit → "/auth/register" pe redirect
  redirect("/auth/register");
}
