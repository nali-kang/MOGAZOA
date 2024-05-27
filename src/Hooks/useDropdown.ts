import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * dropdown 활용을 위한 custom hook with client component
 * @return {RefObject<HTMLElement>} btnRef - Dropdown button에 등록할 Ref
 * @return {boolean} isOpen - dropdown open/close toggle을 위한 state
 * @return {(open:boolean) => void} - dropdown open/close click handler
 */
function useDropdown() {
  // dropdown open/close toggle을 위한 state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // dropdown 생성 버튼에 접근하기 위한 ref
  const btnRef = useRef<HTMLElement>(null);

  // button제외 외부(window)를 클릭할 경우 dropdown close
  // 한가지의 function을 참조하기 위해 useCallback 사용
  const clickOutsideEvent = useCallback((e: MouseEvent) => {
    if (!btnRef?.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      // dropdown이 정상적으로 close 됐을 때 event 제거
      window.removeEventListener('click', clickOutsideEvent);
    }
  }, [isOpen]);

  // 버튼 클릭 시 isOpen toggle, window에 이벤트 추가
  const clickHandler = (open?: boolean) => {
    setIsOpen(open ?? !isOpen);
    if (open ?? !isOpen) {
      window.addEventListener('click', clickOutsideEvent);
    }
  };

  return { btnRef, isOpen, clickHandler };
}

export default useDropdown;
