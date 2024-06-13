'use client';

import { ModalSetterContext, ModalStateContext } from '@/Context/ModalContext';
import { useContext, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../Commons/Button/index';
import CloseButtonIcon from '../Commons/Icon/CloseButtonIcon';

function CompareModal() {
  const router = useRouter();
  const { productId } = useContext(ModalStateContext);
  const setModalState = useContext(ModalSetterContext);

  const [compare1, compare2] = useMemo(() => {
    return [localStorage.getItem('compare1'), localStorage.getItem('compare2')];
  }, [productId]);

  const ModalContents = useMemo(() => {
    if (compare1 && compare2) {
      return <div className="w-[31.25rem] h-[16.4375rem] "> 둘 다 있는데</div>;
    } else {
      return (
        <main className="w-[31.25rem] h-[16.4375rem] flex flex-col gap-10 p-10">
          <button
            className="absolute top-5 right-5"
            onClick={() =>
              // 모달 상태를 false
              setModalState({ isOpen: false, type: '' })
            }
          >
            <CloseButtonIcon />
          </button>
          <div className="text-white mt-5 text-2xl font-semibold leading-['normal']">
            비교 상품이 추가되었습니다.
            <br /> 바로 확인해 보시겠어요?
          </div>
          <Button color="primary" className="w-full h-[4.0625rem]" onClick={() => router.push('/compare')}>
            바로가기
          </Button>
        </main>
      );
    }
  }, [productId, compare1, compare2]);

  return <>{ModalContents}</>;
}

export default CompareModal;
