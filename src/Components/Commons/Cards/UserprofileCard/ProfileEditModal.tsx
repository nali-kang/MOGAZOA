import { SetStateAction, useContext, useState } from 'react';
import { ModalSetterContext } from '@/Context/ModalContext';
import Button from '../../Button';
import { usePatchUserMe } from '@/Apis/User/useUserService';
import { usePostImage } from '@/Apis/Image/useImageService';
import FileInputForm from '../../Input/FileInputForm/FileInputForm';
import { FormProvider, useForm } from 'react-hook-form';
import { transliterate } from 'transliteration';

interface ProfileEditProps {
  description: string;
  nickname: string;
  imgUrl: FileList;
}

export default function ProfileEditModal() {
  const setModalState = useContext(ModalSetterContext);
  const [nickNameValue, setNickNameValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const postProfile = usePatchUserMe({
    description: '',
    nickname: '',
    image: '',
  });
  const postImgUrl = usePostImage({ image: '' });

  const methods = useForm<ProfileEditProps>({
    mode: 'onTouched',
    defaultValues: {
      imgUrl: new DataTransfer().files,
    },
  });
  const { handleSubmit } = methods;

  const registerList = {
    imgUrl: methods.register('imgUrl'),
  };

  const onSubmit = async (data: ProfileEditProps) => {
    const formData = new FormData();
    const file = data.imgUrl[0];
    if (file) {
      const transliteratedFileName = transliterate(file.name);
      const renamedFile = new File([file], transliteratedFileName, { type: file.type });
      formData.append('image', renamedFile);

      postImgUrl.mutate(formData, {
        onSuccess: (result: any) => {
          const ImageUrl = result.data.url;
          const payload = {
            description: textValue,
            nickname: nickNameValue,
            image: ImageUrl,
          };
          postProfile.mutate(payload, {
            onSuccess: () => {
              setModalState({ isOpen: false, type: 'profileEdit' });
            },
            onError: (error: any) => {
              console.error(error);
              console.log(error);
            },
          });
        },
        onError: (error: any) => {
          console.error(error);
        },
      });
    }
  };

  function handleChange(event: { target: { value: SetStateAction<string> } }) {
    setNickNameValue(event.target.value);
  }
  function handleTextChange(event: { target: { value: string } }) {
    const { value } = event.target;
    if (value.length <= 500) {
      setTextValue(value);
    }
  }
  function handleProfileEditCloseOnClick() {
    setModalState({ isOpen: false, type: 'profileEdit' });
  }

  return (
    <FormProvider {...methods}>
      <div className="w-[335px] h-[513px] md:w-[590px] md:h-[648px] desktop:w-[620px] desktop:h-[704px] relative pl-[20px] md:pl-[40px] pt-[40px] md:pt-[60px] pr-[18px] pb-[6px] md:pb-[40px] ">
        <button
          type="button"
          onClick={handleProfileEditCloseOnClick}
          className="w-[24px] h-[24px] md:w-[36px] md:h-[36px] desktop:w-[40px] desktop:h-[40px] absolute right-[15px] md:right-[20px] top-[15px] md:top-[20px] bg-center"
          aria-label="Close"
          style={{
            backgroundImage: 'url(/Icons/close-icon.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div>
          <h1 className="font-['Pretendard'] text-white text-[20px] desktop:text-[24px] font-semibold leading-[28px] desktop:leading-normal mb-[20px] md:mb-[40px] ">
            프로필 편집
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FileInputForm
              className="w-[140px] h-[140px] md:w-[135px] md:h-[135px] desktop:w-[160px] desktop:h-[160px]  "
              {...registerList.imgUrl}
            />
            <div className="flex items-center w-[295px] h-[55px] md:w-[510px] md:h-[60px] desktop:w-[540px] desktop:h-[70px] px-[20px] py-[23px] rounded-[8px] border-[1px] border-[#353542] mt-[10px] md:mt-[15px] bg-scblack focus-within:border-[#3B82F6]">
              <input
                value={nickNameValue}
                onChange={handleChange}
                className="w-[100%] bg-scblack focus:outline-none placeholder-gray1 text-sm desktop:text-base font-normal text-white"
                placeholder="닉네임을 입력해주세요"
              />
            </div>
            <div className="flex flex-col justify-between w-[295px] h-[120px] md:w-[510px] md:h-[160px] desktop:w-[540px]  p-[20px] rounded-[8px] border-[1px] border-[#353542] mt-[10px] md:mt-[15px] bg-scblack focus-within:border-[#3B82F6] ">
              <textarea
                value={textValue}
                onChange={handleTextChange}
                maxLength={500}
                className="w-[100%] h-[43px] md:h-[90px] bg-scblack focus:outline-none placeholder-gray1 text-sm desktop:text-base font-normal text-white whitespace-normal resize-none	"
                placeholder="프로필을 입력해주세요"
              />
              <div className="text-gray1 text-[14px] font-[400] text-right  ">{textValue.length}/500</div>
            </div>
            <Button
              type="submit"
              className="w-[295px] h-[50px] md:w-[510px] md:h-[55px] desktop:w-[540px] desktop:h-[65px]  font-['Pretendard'] text-[16px] desktop-text-[18px] mt-[20px] md:mt-[40px]"
              color="primary"
            >
              저장하기
            </Button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
