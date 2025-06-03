import CategoryTab from '@/app/posts/[post-id]/_components/CategoryTab';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof CategoryTab> = {
  title: 'Sidebar/CategoryTab',
  component: CategoryTab,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof CategoryTab>;

export const Default: Story = {
  args: {
    categories: [
      { category_name: 'Next.js', postCount: 12 },
      { category_name: 'React', postCount: 8 },
      { category_name: 'DevOps', postCount: 4 },
      { category_name: 'CSS', postCount: 5 },
    ],
    currentCategory: 'React',
  },
};
