'use client';

import ModalContainer from '@/Components/Commons/ModalContainer/ModalContainer';
import { ReactNode, createContext, useState } from 'react';
/**
 * @param \{ isOpen: boolean, type: string }
 * @isOpen 모달 열고 닫는 상태
 * @type 모달 안의 내용을 타입으로 설정
 */
export const ModalStateContext = createContext<any>({ isOpen: false, type: '' } as any);
/**
 * @param \{ isOpen: boolean, type: string }
 * @isOpen 모달 열고 닫는 상태
 * @type 모달 안의 내용을 타입으로 설정
 */
export const ModalSetterContext = createContext<any>(() => {
  throw new Error('setModalState function must be used within a ModalProvider');
});
/**
 * @TODO typeof, keyof사용해서 타입 추론 가능하게 변경하기
 */

interface ModalProviderProps {
  children: ReactNode;
}

function ModalProvider({ children }: ModalProviderProps) {
  const [modalState, setModalState] = useState({ isOpen: false, type: '' });

  return (
    <ModalSetterContext.Provider value={setModalState}>
      <ModalStateContext.Provider value={modalState}>
        {children}
        <ModalContainer modalState={modalState} setModalState={setModalState} />
      </ModalStateContext.Provider>
    </ModalSetterContext.Provider>
  );
}

export default ModalProvider;
