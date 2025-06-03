export interface PostWithAuthor {
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

export interface PostContentProps {
  post: {
    id: number;
    author: Author;
    title: string;
    content: string | null;
    created_at: Date | string;
    modified_at: Date | string;
    like_count: number;
    dislike_count: number;
    myReaction?: 'LIKE' | 'DISLIKE' | null;
    categories: Array<{
      categoryId: number;
      category: { category_name: string };
    }>;
  };
}
