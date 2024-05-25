'use client';

import Button from '@/Components/Commons/Button';

export default function Home() {
  return (
    <div>
      <Button
        color="secondary"
        onClick={() => {
          console.log('clcik');
        }}
        // disabled
        // disabled={false}
        className="w-[100px] h-[100px]"
        variant="clickBased"
      >
        testt
      </Button>
    </div>
  );
}
