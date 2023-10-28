// [slug]/page.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

const getSingleBlog = async(context) =>{
  const {slug} = context.params;
  const data = await import(`../../data/${slug}.md`);
  const singleDocument = matter(data.default);

  return{
    singleDocument:singleDocument
  }
}

const SingleBlog = async (props) => {
  const {singleDocument} = await getSingleBlog(props);
  return (
      <>
        <div>
          {/* ここになにかあとで追加するのだと思われる */}
        </div>
        <div>
          <div>
            <h1>{singleDocument.data.title}</h1>
            <p>{new Date(singleDocument.data.date).toLocaleDateString()}</p>
            <ReactMarkdown>{singleDocument.content}</ReactMarkdown>
          </div>
        </div>
      </>
    )
}

export default SingleBlog

export const generateStaticParams = async() => {

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
  const {blogs} = await getAllBlogs();
  const paths = blogs.map((blog) => `/${blog.slug}`);
  return paths;
}