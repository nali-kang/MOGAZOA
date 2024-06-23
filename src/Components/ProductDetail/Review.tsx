'use client';

import Image from 'next/image';
import { MouseEvent, useEffect, useState } from 'react';
import { Dropdown, Option } from '../Commons/Dropdown/DropdownComponent';
import { useGetProductReviewList } from '@/Apis/Product/useProduct.Service';
import { Rating } from 'react-simple-star-rating';
import { useRouter } from 'next/navigation';
import { useDeleteReview, useDeleteReviewLike, usePostReviewLike } from '@/Apis/Review/useReview.Service';
import getUserInfoFromToken from '@/Utils/getUserInfoFromToken';
import { useQueryClient } from '@tanstack/react-query';

export default function ProductReview({ productId }: any) {
  const router = useRouter();
  const [sorting, setSorting] = useState<'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount'>('recent');
  const { data } = useGetProductReviewList(productId, sorting);
  const sort: Option[] = [
    { label: '최신순', value: 'recent' },
    { label: '별점 높은순', value: 'ratingDesc' },
    { label: '별점 낮은순', value: 'ratingAsc' },
    { label: '좋아요순', value: 'likeCount' },
  ];
  // TODO: 유저 프로필 기본 이미지 설정
  const defaultUserImage = '/images/apple-watch.svg';

  // 리뷰 삭제
  const deleteReview = useDeleteReview(0);
  function handleDeleteButton(e: MouseEvent<HTMLImageElement>) {
    deleteReview.mutate(e.currentTarget.id);
    window.location.reload();
  }
  // 내 아이디 확인
  const [userId, setUserId] = useState(0);
  const token = getUserInfoFromToken();

  // 좋아요버튼
  const queryClient = useQueryClient();
  const postReviewLike = usePostReviewLike(0);
  const deleteReviewLike = useDeleteReviewLike(0);
  async function handleLikeClick(e: MouseEvent<HTMLButtonElement>) {
    await postReviewLike.mutate(e.currentTarget.id);
    await queryClient.invalidateQueries();
    await queryClient.refetchQueries();
  }
  async function handleUnlikeClick(e: MouseEvent<HTMLButtonElement>) {
    await deleteReviewLike.mutate(e.currentTarget.id);
    await queryClient.invalidateQueries();
    await queryClient.refetchQueries();
  }

  useEffect(() => {
    setUserId(token.id);
  }, []);
  return (
    <div className="flex-col ">
      <div className="w-[375px] md:w-[726px] xl:w-[980px] flex justify-between items-center mb-7">
        <div className=" font-semibold text-lg px-5 xl:text-2xl w-30 h-auto">상품 리뷰</div>
        <Dropdown
          option={sort}
          value={sorting}
          onChange={(value: any) => {
            setSorting(value);
          }}
          type="sort"
        />
      </div>
      {data.list.map((review: any) => (
        <div
          key={review.id}
          className="relative w-[335px] md:w-[684px] xl:w-[940px] bg-scblack rounded-xl border border-zinc-700 justify-center mx-auto p-5 md:flex mb-3"
        >
          {review.userId === userId ? (
            <Image
              id={review.id}
              src="/Icons/close-icon.svg"
              alt="close-modal"
              className="w-4 h-4 absolute right-4 top-4 hover:cursor-pointer"
              width={10}
              height={10}
              onClick={handleDeleteButton}
            />
          ) : (
            <div />
          )}
          <div className="justify-start items-start gap-2.5 flex">
            <Image
              src={review.user.image || defaultUserImage}
              alt="유저이미지"
              width={42}
              height={42}
              className="bg-zinc-300 rounded-full w-[42px] h-[42px] hover:cursor-pointer mt-[3px]"
              onClick={() => router.push(`/user/${review.userId}`)}
            />

            <div className="flex-col justify-start items-start inline-flex w-40">
              <div className="text-gray-100 text-sm font-normal font-['Pretendard'] w-40 xl:text-base">
                {review.user.nickname}
              </div>
              {/* TODO: Rating 반응형으로, 로딩중에 스켈레톤으로 */}
              <Rating initialValue={review.rating} size={15} iconsCount={5} readonly SVGstyle={{ display: 'inline' }} />
            </div>
          </div>
          <div className="w-full flex-col justify-start items-start gap-5 inline-flex">
            <div className="flex-col justify-start items-start gap-2.5 flex">
              <div className="w-full text-gray-100 xl:text-base text-xs font-normal font-['Pretendard'] leading-snug">
                {review.content}
              </div>
            </div>
            <div className="justify-start items-start gap-2.5 inline-flex">
              {review.reviewImages.map((image: { id: number; source: string }) => (
                <Image
                  key={image.id}
                  src={image.source}
                  alt="리뷰이미지"
                  width={60}
                  height={60}
                  className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] xl:w-[100px] xl:h-[100px] bg-zinc-300 rounded-lg"
                />
              ))}
            </div>
            <div className="w-full justify-between items-end inline-flex">
              <div className="text-gray-500 text-xs font-normal font-['Pretendard']">
                {review.updatedAt.substr(0, 10)}
              </div>
              <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                {review.isLiked ? (
                  <button
                    id={review.id}
                    onClick={handleUnlikeClick}
                    type="button"
                    className="px-2.5 py-1.5 bg-zinc-800 rounded-[100px] border border-zinc-700 justify-center items-center gap-[5px] flex"
                  >
                    <Image
                      src="/Icons/like-icon.svg"
                      alt="좋아요활성"
                      width={14}
                      height={14}
                      className="md:w-5 md:h-5"
                    />
                    <div className=" text-xs bg-gradient font-normal font-['Pretendard'] bg-clip-text text-transparent">
                      {review.likeCount}
                    </div>
                  </button>
                ) : (
                  <button
                    id={review.id}
                    type="button"
                    className="px-2.5 py-1.5 bg-zinc-800 rounded-[100px] border border-zinc-700 justify-center items-center gap-[5px] flex"
                    onClick={handleLikeClick}
                  >
                    <Image
                      src="/Icons/unlike-icon.svg"
                      alt="비활성좋아요"
                      width={14}
                      height={14}
                      className="md:w-5 md:h-5"
                    />
                    <div className=" text-xs bg-slate-300 font-normal font-['Pretendard'] bg-clip-text text-transparent">
                      {review.likeCount}
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className=" mb-20" />
    </div>
  );
}
