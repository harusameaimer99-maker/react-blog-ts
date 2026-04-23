import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Submission,PostDetailResponse } from "../Type.tsx";




export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Submission | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
        const data:PostDetailResponse = await res.json() ;
        setPost(data.post);
      } catch (error) {
        console.error("エラーが発生しました", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, [id]);

  if (isLoading) return <h2>読み込み中...</h2>;

  if (!post) {
    return (
      <div>
        <h2>記事が見つかりませんでした</h2>
        <Link to="/">記事一覧に戻る</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content ??'' }} />
      <br />
      <Link to="/">記事一覧に戻る</Link>
    </div>
  );
}