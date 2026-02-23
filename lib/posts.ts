import { Post, CreatePostData, UpdatePostData } from "@/types/post";

// Stockage en mémoire des posts (simulé)
let posts: Post[] = [
  {
    id: 1,
    title: "Premier post",
    body: "Ceci est le contenu du premier post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    userId: 1,
  },
  {
    id: 2,
    title: "Deuxième post",
    body: "Ceci est le contenu du deuxième post. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    userId: 1,
  },
  {
    id: 3,
    title: "Troisième post",
    body: "Ceci est le contenu du troisième post. Ut enim ad minim veniam, quis nostrud exercitation.",
    userId: 1,
  },
];

let nextId = 4;

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostById(id: number): Post | undefined {
  return posts.find((post) => post.id === id);
}

export function createPost(data: CreatePostData): Post {
  const newPost: Post = {
    id: nextId++,
    title: data.title,
    body: data.body,
    userId: 1,
  };
  posts.push(newPost);
  return newPost;
}

export function updatePost(id: number, data: UpdatePostData): Post | null {
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return null;

  posts[index] = {
    ...posts[index],
    ...data,
  };
  return posts[index];
}

export function deletePost(id: number): boolean {
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return false;

  posts.splice(index, 1);
  return true;
}
