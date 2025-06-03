import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Modal from '../components/common/Modal';

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
      description: '`true` → 모달 표시',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const AlwaysOpen: Story = {
  args: {
    isOpen: true,
    children: '정말 삭제하시겠습니까?',
    actions: [
      {
        label: '삭제하기',
        onClick: () => alert('삭제 클릭됨'),
      },
      {
        label: '취소',
        className: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        onClick: () => alert('취소 클릭됨'),
      },
    ],
  },
};
