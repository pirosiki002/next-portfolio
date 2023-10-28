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
  const orderdBlogs = blogs.sort((a, b) => {
    // return b.frontmatter.id - a.frontmatter.id;
    return a.frontmatter.id - b.frontmatter.id;
  });

  return {
    blogs:orderdBlogs
  }
}

const Blog = async () => {
  // getAllBlogs();
  const {blogs} = await getAllBlogs();
  console.log(blogs);
  return (
    <>
      <div>
        <div>
          <h1>Blog</h1>
          <p>エンジニアの日常生活をお届けします</p>
            {blogs.map((blog, Index) =>
              <div key={Index}>
                <div>
                  <h2>{blog.frontmatter.title}</h2>
                  {/* <p>{blog.frontmatter.description}</p> */}
                  <p>{blog.frontmatter.excerpt}</p> {/*現状はなにも表示されない */}
                  <p>{new Date(blog.frontmatter.date).toLocaleDateString()}</p>
                  <Link href={`/blog/${blog.slug}`}>Read More</Link>
                </div>
                <div>
                  {/* ここになにかあとで追加するのだと思われる */}
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default Blog;
