import { usePostImage } from '@/Apis/Image/useImageService';
import React, { ChangeEvent, EventHandler, useRef, useState } from 'react';

function ImageUpload() {
  const [uploadImage, setUploadImage] = useState('');
  const image = uploadImage;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const postImage = usePostImage({ image });
  postImage.mutate(image);

  const handleImageClick = () => {
    (fileInputRef.current as HTMLInputElement).click();
  };

  const handleFileChange = (event: ChangeEvent) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadImage(imageUrl);
    }
  };

  return (
    <div>
      <button
        type="button"
        className={`${
          uploadImage
            ? 'w-[130px] h-[130px] md:w-[125px] md:h-[125px] desktop:w-[150px] desktop:h-[150px] p-[30px] bg-center cursor-pointer'
            : 'w-[24px] h-[24px] desktop:w-[34px] desktop:h-[34px] bg-center cursor-pointer'
        }`}
        style={{
          backgroundImage: uploadImage ? `url(${uploadImage})` : 'url(/Icons/img-icon.svg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        onClick={handleImageClick}
        aria-label="이미지 업로드"
      />
      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
    </div>
  );
}

export default ImageUpload;
