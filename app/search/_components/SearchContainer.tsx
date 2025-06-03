'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Image from 'next/image';
import searchIcon from '@/assets/icons/searchIcon.svg';

const SearchContainer = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('검색어:', query);
  };

  return (
    <div className='flex items-center justify-center pt-16 mt-10 px-4 gap-5'>
      <form onSubmit={handleSearch} className='w-full max-w-xl'>
        <Input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='검색어를 입력하세요'
          className='text-lg px-5 py-6'
        />
      </form>
      <button className='cursor-pointer'>
        <Image src={searchIcon} alt='search' className='w-8 h-8' />
      </button>
    </div>
  );
};

export default SearchContainer;
