'use client';

import { useEffect, useRef, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Post from './Post';

interface Category {
  id: number;
  category_name: string;
}

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
  categories: Category[];
  postsByCategory: Record<string, PostWithAuthor[]>;
}

export default function Posts({ categories, postsByCategory }: PostsProps) {
  const [selectedTab, setSelectedTab] = useState('all');
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const CATEGORY_LIST = [
    { value: 'all', label: '전체' },
    ...(categories ?? []).map((cat) => ({
      value: cat.category_name.toLowerCase(),
      label: cat.category_name,
    })),
  ];

  useEffect(() => {
    const currentRef = tabRefs.current[selectedTab];
    if (currentRef) {
      setIndicatorStyle({
        left: currentRef.offsetLeft,
        width: currentRef.offsetWidth,
      });
    }
  }, [selectedTab]);

  return (
    <Tabs
      defaultValue='all'
      className='w-full sm:pl-10'
      onValueChange={(value) => setSelectedTab(value)}
    >
      <TabsList>
        {CATEGORY_LIST.map((cat) => (
          <TabsTrigger
            key={cat.value}
            ref={(el) => {
              tabRefs.current[cat.value] = el;
            }}
            value={cat.value}
          >
            <p className='cursor-pointer'>{cat.label}</p>
          </TabsTrigger>
        ))}

        <div
          className='absolute bottom-0 h-[2px] bg-gray-900 transition-all'
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />
      </TabsList>

      {CATEGORY_LIST.map((cat) => (
        <TabsContent key={cat.value} value={cat.value} className='pt-6 sm:pl-5'>
          <div className='space-y-8 cursor-pointer'>
            {postsByCategory[cat.value]?.length > 0 ? (
              postsByCategory[cat.value].map((post) => <Post key={post.id} post={post} />)
            ) : (
              <p className='text-gray-500 font-semibold'>해당 카테고리에 게시물이 없습니다.</p>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
