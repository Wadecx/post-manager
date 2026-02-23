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

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.id}`);
        if (!response.ok) {
          setError("Post non trouvé");
          return;
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError("Erreur lors du chargement du post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) return;

    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-muted-foreground">Chargement du post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center">
        <p className="text-destructive mb-4">{error || "Post non trouvé"}</p>
        <Button asChild>
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/">← Retour à la liste</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{post.title}</CardTitle>
          <CardDescription>Post #{post.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-wrap">{post.body}</p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button asChild>
            <Link href={`/posts/${post.id}/edit`}>Éditer</Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Supprimer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
