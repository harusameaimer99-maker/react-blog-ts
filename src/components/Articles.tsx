import { useState, useEffect } from 'react'
import styles from './Articles.module.css'
import { Link } from 'react-router-dom'
import {Submission,SubmissionResponse} from '../Type.tsx'




export default function Articles() {
  const [posts, setPosts] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts");
        const data:SubmissionResponse = await res.json() ;
        setPosts(data.posts);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, []);

  if (isLoading) return <h2>読み込み中...</h2>;

  if (posts.length === 0) {
    return (
      <div>
        <h2>記事が見つかりませんでした</h2>
        <Link to="/">記事一覧に戻る</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>記事一覧</h1>
      <div className={styles['post-list']}>
        {posts.map((post) => (
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}