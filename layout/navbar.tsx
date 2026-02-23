"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Gestionnaires de posts
          </Link>
          <div className="flex gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Accueil
            </Link>
            <Link
              href="/posts/create"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/posts/create"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              Créer un post
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
