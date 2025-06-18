 //app/blug/[blug]/page.js (localhost:3000/blog/หนังสือ)

export default async function BlogPost({ params }) {
  const { slug } = await params;
  
  return (
    <div>
      <h1>บทความ: {slug}</h1>
      <p>เนื้อหาบทความ...</p>
    </div>
  );
}