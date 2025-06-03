import { Suspense } from 'react';
import ConfirmModalContainer from './_components/ConfirmModalContainer';

export default function ConfirmLinkPage() {
  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <ConfirmModalContainer />
      </Suspense>
    </>
  );
}
