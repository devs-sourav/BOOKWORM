"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // List of routes where navbar should be hidden
  const hideNavbarRoutes = ["/login", "/registration", "/forgot-password"];
  
  // Hide navbar on specified routes
  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }
  
  return <Navbar />;
}