import { useDeleteProductFavorite, usePostProductFavorite } from '@/Apis/Product/useProduct.Service';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';

// import { useQueryClient } from '@tanstack/react-query';

// TODO: any 없애기
/**
 * @TODO 새로고침하면 무조건 하트가 없는 상태로 오는 오류...
 */
export default function FavoriteProductButton({ productId, isFavorite }: any) {
  const deleteFavorite = useDeleteProductFavorite(productId);
  const postFavorite = usePostProductFavorite(productId);
  const token = Cookies.get('token');
  const [IsOn, setIsOn] = useState(isFavorite);
  const queryClient = useQueryClient();

  // console.log('버튼안isFavorite', isFavorite);
  // console.log('버튼안IsOn', IsOn);
  const onClick = async () => {
    if (!token) {
      Swal.fire('찜 기능은 로그인이 필요합니다.');
    } else if (IsOn) {
      deleteFavorite.mutate(productId);
      await queryClient.invalidateQueries();
      await queryClient.refetchQueries();
      setIsOn(false);
    } else {
      postFavorite.mutate(productId);
      await queryClient.invalidateQueries();
      await queryClient.refetchQueries();
      setIsOn(true);
    }
  };
  useEffect(() => {
    setIsOn(isFavorite);
  }, []);

  return (
    <button type="button" onClick={onClick}>
      {IsOn ? (
        <Image src="/Icons/save-icon.svg" alt="하트 아이콘" width={24} height={24} />
      ) : (
        <Image src="/Icons/unsave-icon.svg" alt="하트 아이콘" width={24} height={24} />
      )}
    </button>
  );
}
