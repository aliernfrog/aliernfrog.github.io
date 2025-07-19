import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const { slug } = params;
  const path = `./src/posts/${slug}.md`;
  
  try {
    const raw = readFileSync(path).toString();
    const { data, content } = matter(raw);
    
    return {
      post: {
        id: slug,
        ...data,
        content
      }
    }
  } catch {
    error(404, "Post not found");
  }
}

export async function entries() {
  const files = readdirSync("./src/posts");
  return files.map(name => ({
    slug: name.replace(/\.md$/, "")
  }));
}