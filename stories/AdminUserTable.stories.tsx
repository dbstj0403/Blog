import { useState } from 'react';
import AdminUserTable from '@/app/admin/_components/AdminUserTable';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof AdminUserTable> = {
  title: 'Admin/AdminUserTable',
  component: AdminUserTable,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof AdminUserTable>;

export const Default: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const mockUsers = [
      {
        id: 1,
        name: '홍길동',
        email: 'hong@example.com',
        role: 'ADMIN',
        provider: 'github',
        created_at: new Date(),
      },
      {
        id: 2,
        name: null,
        email: 'anonymous@example.com',
        role: 'USER',
        provider: 'email',
        created_at: new Date(),
      },
    ];

    const filtered = mockUsers.filter((u) =>
      `${u.name ?? ''} ${u.email ?? ''}`.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
      <Card className='p-6 shadow-sm mt-6'>
        <div className='flex justify-end mb-4 items-center gap-3'>
          <Input
            type='text'
            placeholder='닉네임 또는 이메일 검색'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full sm:w-64'
          />
        </div>

        <table className='w-full text-sm border-collapse'>
          <thead>
            <tr>
              <th>ID</th>
              <th>닉네임</th>
              <th>이메일</th>
              <th>권한</th>
              <th>가입경로</th>
              <th>가입일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name ?? '이름 없음'}</td>
                <td>{u.email}</td>
                <td>{u.role === 'ADMIN' ? '관리자' : '일반'}</td>
                <td>{u.provider === 'github' ? 'GitHub' : 'Email'}</td>
                <td>{u.created_at.toLocaleDateString()}</td>
                <td>
                  <Button variant='destructive' size='sm' onClick={() => setShowDeleteModal(true)}>
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          actions={[
            {
              label: '삭제하기',
              onClick: () => setShowDeleteModal(false),
              className: 'bg-red-600 text-white hover:bg-red-700',
            },
            {
              label: '취소',
              onClick: () => setShowDeleteModal(false),
              className: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
            },
          ]}
        >
          해당 유저를 정말 삭제하시겠습니까?
        </Modal>
      </Card>
    );
  },
};
