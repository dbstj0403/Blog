import { SessionProvider } from 'next-auth/react';
import PostContent from '@/app/posts/[post-id]/_components/PostContent';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof PostContent> = {
  title: 'Posts/PostContent',
  component: PostContent,
  decorators: [
    (Story) => (
      <SessionProvider session={null}>
        <Story />
      </SessionProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof PostContent>;

export const Default: Story = {
  args: {
    post: {
      id: 1,
      author: {
        id: 123,
        name: '홍길동',
        image: null,
      },
      title: '스토리북 포스트 콘텐츠 예시',
      content: `이 콘텐츠는 Storybook에서 확인하는 예시입니다.\n여러 줄 텍스트도 정상적으로 렌더링되는지 확인할 수 있습니다.`,
      created_at: new Date(),
      modified_at: new Date(),
      like_count: 3,
      dislike_count: 1,
      myReaction: null,
      categories: [
        {
          categoryId: 1,
          category: {
            category_name: 'Next.js',
          },
        },
        {
          categoryId: 2,
          category: {
            category_name: 'React',
          },
        },
      ],
    },
  },
};
