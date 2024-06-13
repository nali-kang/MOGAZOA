'use client';

import { ModalSetterContext, ModalStateContext } from '@/Context/ModalContext';
import { useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../Commons/Button/index';
import CloseButtonIcon from '../Commons/Icon/CloseButtonIcon';

function CompareModal() {
  const router = useRouter();
  const { productInfo } = useContext(ModalStateContext);
  const setModalState = useContext(ModalSetterContext);

  const [selectProd, setSelectProd] = useState<string>('');

  const modalSize = 'w-[20.9375rem] md:w-[31.25rem] flex flex-col gap-[1.88rem] md:gap-10 p-5 md:p-10';
  const buttonSize = 'w-full h-[3.125rem] md:h-[3.4375rem] lg:h-[4.0625rem]';
  const infoSize = "text-white mt-5 text-xl lg:text-2xl font-semibold leading-7 lg:leading-['normal']";

  const [compare1, compare2] = useMemo(() => {
    const compareItem = localStorage.getItem('compare') && JSON.parse(localStorage.getItem('compare') ?? '[]');
    return [compareItem?.[0], compareItem?.[1]];
  }, [productInfo]);

  const ModalContents = useMemo(() => {
    if (compare1?.value === productInfo?.value || compare2?.value === productInfo?.value) {
      return (
        <main className={modalSize + ' h-[12.25rem] md:h-64 lg:h-[16.4375rem]'}>
          <button
            className="absolute top-5 right-5"
            onClick={() =>
              // 모달 상태를 false
              setModalState({ isOpen: false, type: '' })
            }
          >
            <CloseButtonIcon />
          </button>
          <div className={infoSize}>
            이미 추가된 상품입니다.
            <br /> 비교하기 페이지로 이동하시겠어요?
          </div>
          <Button color="primary" className={buttonSize} onClick={() => router.push('/compare')}>
            바로가기
          </Button>
        </main>
      );
    }
    if (compare1 && compare2) {
      return (
        <main className={modalSize + ' h-[21rem] md:h-[25.5rem] lg:h-[28.3125rem]'}>
          <button
            className="absolute top-5 right-5"
            onClick={() =>
              // 모달 상태를 false
              setModalState({ isOpen: false, type: '' })
            }
          >
            <CloseButtonIcon />
          </button>
          <div className={infoSize}>
            <p>
              지금 보신 '{productInfo.label.length > 15 ? productInfo.label.slice(0, 14) + '...' : productInfo.label}'
            </p>
            <p>어떤 상품과 비교할까요?</p>
          </div>
          <div className="flex flex-col w-full gap-[0.62rem] md:gap-5">
            <Button
              color="tertiary"
              className={`${buttonSize} ${selectProd === compare1.value ? '!text-[#05D58B] !border-[#05D58B]' : ''} hover:text-[#05D58B] hover:border-[#05D58B] truncate`}
              onClick={() => setSelectProd(compare1.value)}
            >
              {compare1.label}
            </Button>
            <Button
              color="tertiary"
              className={`${buttonSize} ${selectProd === compare2.value ? '!text-[#FF2F9F] !border-[#FF2F9F]' : ''} hover:text-[#FF2F9F] hover:border-[#FF2F9F] truncate`}
              onClick={() => setSelectProd(compare2.value)}
            >
              {compare2.label}
            </Button>
          </div>
          <Button
            color="primary"
            className={buttonSize}
            disabled={!selectProd}
            onClick={() => {
              if (selectProd === compare1.value) {
                localStorage.setItem('compare', JSON.stringify([compare1, productInfo]));
              } else {
                localStorage.setItem('compare', JSON.stringify([compare2, productInfo]));
              }
              router.push('/compare');
            }}
          >
            교체하기
          </Button>
        </main>
      );
    } else {
      localStorage.setItem('compare', JSON.stringify([productInfo, compare1 ?? compare2]));
      return (
        <main className={modalSize + ' h-[12.25rem] md:h-64 lg:h-[16.4375rem]'}>
          <button
            className="absolute top-5 right-5"
            onClick={() =>
              // 모달 상태를 false
              setModalState({ isOpen: false, type: '' })
            }
          >
            <CloseButtonIcon />
          </button>
          <div className={infoSize}>
            비교 상품이 추가되었습니다.
            <br /> 바로 확인해 보시겠어요?
          </div>
          <Button color="primary" className={buttonSize} onClick={() => router.push('/compare')}>
            바로가기
          </Button>
        </main>
      );
    }
  }, [productInfo, compare1, compare2, selectProd]);

  return <>{ModalContents}</>;
}

export default CompareModal;
