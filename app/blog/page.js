// app/blog/page.js
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const getAllBlogs = async() =>{
  const directoryPath = path.join(process.cwd(), 'app', 'data');
  const files = fs.readdirSync(directoryPath);
  const blogs = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const fileData = fs.readFileSync(
      path.join(directoryPath, filename),
      "utf8"
    );
    const { data} = matter(fileData);
    return {
      frontmatter: data,
      slug: slug
    }
  });
  return{
    blogs:blogs
  }
}

const Blog = async () => {
  // getAllBlogs();
  const {blogs} = await getAllBlogs();
  console.log(blogs);
  return (
    <div>
      <h1>プログページ</h1>
      {blogs.map((blog, Index) =>
        <div key={Index}>
          <h2>{blog.frontmatter.title}</h2>
          <p>{new Date(blog.frontmatter.date).toLocaleDateString()}</p>
          <p>{blog.frontmatter.description}</p>
          <Link href={`/blog/${blog.slug}`}>Read More</Link>
        </div>
      )}
    </div>
  );
};

export default Blog;
