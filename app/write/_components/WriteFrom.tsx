'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const WriteForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/write', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, category }),
    });

    if (res.ok) {
      const newPost = await res.json();
      router.push(`/posts/${newPost.id}`);
    } else {
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='max-w-3xl mx-auto mt-20 space-y-5 px-4 sm:px-0 pb-10'
      >
        <p className='font-semibold text-2xl text-gray-600'>포스트 작성</p>
        <div>
          <label className='block mb-2 font-medium text-gray-800'>제목</label>
          <Input
            type='text'
            placeholder='제목을 입력하세요'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className='block mb-2 font-medium text-gray-800'>내용</label>
          <Textarea
            rows={10}
            placeholder='내용을 입력하세요'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label className='block mb-2 font-medium text-gray-800'>카테고리</label>
          <Input
            type='text'
            placeholder='카테고리를 공백으로 구분하여 입력하세요'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <Button type='submit' className='w-full sm:w-auto font-semibold p-5 cursor-pointer'>
          등록하기
        </Button>
      </form>
    </>
  );
};

export default WriteForm;
