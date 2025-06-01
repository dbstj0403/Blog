'use client';

import * as React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Post from './Post';

const CATEGORY_LIST = [
  { value: 'all', label: '전체' },
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'spring', label: 'Spring' },
];

export default function Posts() {
  const [selectedTab, setSelectedTab] = React.useState('all');
  const tabRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = React.useState({
    left: 0,
    width: 0,
  });

  React.useEffect(() => {
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
            <Post />
            <Post />
            <Post />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
