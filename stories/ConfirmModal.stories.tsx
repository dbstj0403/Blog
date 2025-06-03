import { useState } from 'react';
import ConfirmLinkModal from '@/app/auth/confirm-link/_components/ConfirmModal';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof ConfirmLinkModal> = {
  title: 'Modals/ConfirmLinkModal',
  component: ConfirmLinkModal,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof ConfirmLinkModal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        <ConfirmLinkModal
          isOpen={open}
          email='example@domain.com'
          onConfirm={() => {
            console.log('confirmed');
            setOpen(false);
          }}
          onCancel={() => {
            console.log('cancelled');
            setOpen(false);
          }}
        />
      </>
    );
  },
};
