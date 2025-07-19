import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";

export async function load() {
  const files = readdirSync("./src/posts");
  
  const allPosts = files.map(file => {
    const path = `./src/posts/${file}`;
    const id = file.substring(0, file.length-3);
    const raw = readFileSync(path).toString();
    const { data } = matter(raw);
    return {
      id, ...data
    }
  }).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  
  return {
    posts: allPosts
  }
}