"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!title.trim() || !body.trim()) {
      setError("Le titre et le contenu sont requis");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });

      if (!response.ok) {
        setError("Erreur lors de la création du post");
        return;
      }

      router.push("/");
    } catch (err) {
      setError("Erreur lors de la création du post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/">← Retour à la liste</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Créer un nouveau post</CardTitle>
          <CardDescription>
            Remplissez les champs ci-dessous pour créer un nouveau post
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                placeholder="Entrez le titre du post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="body">Contenu</Label>
              <Textarea
                id="body"
                placeholder="Entrez le contenu du post"
                rows={6}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Création..." : "Créer le post"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/">Annuler</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
