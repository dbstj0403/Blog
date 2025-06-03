'use client';

import { useState } from 'react';
import Image from 'next/image';
import searchIcon from '@/assets/icons/searchIcon.svg';
import { Input } from '@/components/ui/input';

interface SearchResult {
  post_id: number;
  title: string;
  snippet: string | null;
}

export default function SearchContainer() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // ← 추가

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      alert('검색어를 두 글자 이상 입력하세요.');
      return;
    }

    setLoading(true);
    setSearched(true); // ← 검색 시도 플래그 ON

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}&limit=20&page=1`);
      if (!res.ok) throw new Error('검색 실패');

      const data = await res.json();
      setResults(data.data || []);
    } catch (err) {
      console.error(err);
      alert('검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center pt-16 mt-10 px-4 gap-6'>
      {/* 검색창 */}
      <form onSubmit={handleSearch} className='w-full max-w-xl flex gap-3'>
        <Input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='포스트 제목 또는 내용을 입력하세요'
          className='text-lg px-5 py-6 flex-1'
        />
        <button
          type='submit'
          className='flex cursor-pointer items-center justify-center w-12 h-12 rounded-lg bg-hana-green hover:bg-hana-green/90'
        >
          <Image src={searchIcon} alt='search' className='w-6 h-6 invert' />
        </button>
      </form>

      {/* 결과 & 메시지 */}
      {loading && <p className='text-gray-500 mt-4'>검색 중...</p>}

      {!loading && searched && results.length > 0 && (
        <ul className='w-full max-w-xl space-y-4'>
          {results.map((post) => (
            <li
              key={post.post_id}
              className='border rounded-lg p-4 hover:shadow cursor-pointer'
              onClick={() => (location.href = `/posts/${post.post_id}`)}
            >
              <h3 className='font-semibold'>{post.title}</h3>
              {post.snippet && <p className='text-sm text-gray-600 truncate'>{post.snippet}</p>}
            </li>
          ))}
        </ul>
      )}

      {!loading && searched && results.length === 0 && (
        <p className='text-gray-500'>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
