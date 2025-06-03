import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BestPosts from '@/components/post/BestPosts';

const meta: Meta<typeof BestPosts> = {
  title: 'Posts/BestPosts',
  component: BestPosts,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof BestPosts>;

export const Mocked: Story = {
  render: () => {
    const mockPosts = [
      {
        id: 1,
        title: 'Next.js 14 새로운 기능 정리',
        author: { name: '홍길동' },
      },
      {
        id: 2,
        title: 'React Server Components 이해하기',
        author: { name: null },
      },
    ];

    return (
      <div className='max-w-md p-5'>
        <div className='flex flex-col gap-6'>
          {mockPosts.map((post) => (
            <div
              key={post.id}
              className='flex flex-col gap-3 border-[1px] border-gray-200 rounded-lg p-3 shadow-sm'
            >
              <p className='text-base font-semibold line-clamp-2'>{post.title}</p>
              <p className='text-sm text-gray-500'>{post.author?.name ?? '익명'}</p>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
