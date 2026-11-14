import type { Metadata } from "next";
import Register from "@/authentication/register";

export const metadata: Metadata = { title: "Create account" };

export default function Page() {
  return <Register />;
}