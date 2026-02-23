"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Post } from "@/types/post";
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

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.id}`);
        if (!response.ok) {
          setError("Post non trouvé");
          return;
        }
        const data: Post = await response.json();
        setTitle(data.title);
        setBody(data.body);
      } catch (err) {
        setError("Erreur lors du chargement du post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!title.trim() || !body.trim()) {
      setError("Le titre et le contenu sont requis");
      setSaving(false);
      return;
    }

    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });

      if (!response.ok) {
        setError("Erreur lors de la mise à jour du post");
        return;
      }

      router.push(`/posts/${params.id}`);
    } catch (err) {
      setError("Erreur lors de la mise à jour du post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-muted-foreground">Chargement du post...</p>
      </div>
    );
  }

  if (error && !title && !body) {
    return (
      <div className="text-center">
        <p className="text-destructive mb-4">{error}</p>
        <Button asChild>
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" asChild className="mb-4">
        <Link href={`/posts/${params.id}`}>← Retour au post</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Éditer le post</CardTitle>
          <CardDescription>
            Modifiez les champs ci-dessous pour mettre à jour le post
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
                disabled={saving}
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
                disabled={saving}
              />
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href={`/posts/${params.id}`}>Annuler</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
