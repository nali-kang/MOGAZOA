import Image from 'next/image';

export default function FloatingButton() {
  const handleFloatingButtonClick = () => {
    /* 
        TODO : 클릭 시 모달 open
    */
    console.log('handleFloatingButtonClick');
  };
  return (
    <button
      type="button"
      onClick={handleFloatingButtonClick}
      className="fixed w-16 h-16 bottom-10 right-5 md:bottom-16 md:right-8 lg:bottom-20 lg:right-40"
    >
      <Image src="/Icons/floating-icon.svg" alt="floating-plus-button" fill />
    </button>
  );
}
