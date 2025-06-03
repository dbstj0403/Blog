import { useState } from 'react';
import EditProfileModal from '@/app/my-page/_components/EditProfileModal';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof EditProfileModal> = {
  title: 'Modals/EditProfileModal',
  component: EditProfileModal,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof EditProfileModal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>프로필 수정 모달 열기</Button>

        <EditProfileModal
          isOpen={open}
          currentName='홍길동'
          onClose={() => {
            console.log('모달 닫힘');
            setOpen(false);
          }}
          onSuccess={(name) => {
            console.log('닉네임 수정됨:', name);
            setOpen(false);
          }}
        />
      </>
    );
  },
};
