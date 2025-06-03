"use client";

import Post from "@/components/post/Post";

interface PostWithAuthor {
  id: number;
  title: string;
  content: string | null;
  like_count: number;
  dislike_count: number;
  created_at: Date;
  modified_at: Date;
  author: {
    id: number;
    name: string | null;
    image: string | null;
  };
}

interface PostsProps {
  posts: PostWithAuthor[];
  categoryName: string;
}

export default function Posts({ posts, categoryName }: PostsProps) {
  return (
    <div className="space-y-6 pt-16 mt-10 pr-5">
      <h2 className="text-2xl font-bold text-gray-800">
        {categoryName === "All" ? "전체 게시글" : `${categoryName}`}
      </h2>

      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p className="text-gray-500 font-semibold">게시글이 없습니다.</p>
      )}
    </div>
  );
}
