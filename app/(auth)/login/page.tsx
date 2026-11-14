import type { Metadata } from "next";
import Login from "@/authentication/login";

export const metadata: Metadata = { title: "Sign in" };

export default function Page() {
  return <Login />;
}