import { usePostImage } from '@/Apis/Image/useImageService';
import React, { useRef, useState } from 'react';

function ImageUpload() {
  const [uploadImage, setUploadImage] = useState('');
  const fileInputRef = useRef('');

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadImage(imageUrl);
      usePostImage((image = imageUrl));
    }
  };

  return (
    <div>
      <button
        type="button"
        className={`${
          uploadImage
            ? 'w-[130px] h-[130px] md:w-[125px] md:h-[125px] xl:w-[150px] xl:h-[150px] p-[30px] bg-center cursor-pointer'
            : 'w-[24px] h-[24px] xl:w-[34px] xl:h-[34px] bg-center cursor-pointer'
        }`}
        style={{
          backgroundImage: uploadImage ? `url(${uploadImage})` : 'url(/icons/img-icon.svg)',
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
