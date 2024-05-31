import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { PostImageRes, PostImagePayload } from './Image.type';
import queryOptions from './queries';
import { selectData } from '../Utils';

/**
 * Presigned URL을 생성합니다.
 * @param image required; \{
  image: string;
}
 */

export function usePostImage({ image }: PostImagePayload) {
  const res = useMutation(queryOptions.postImage(image));
  return selectData<PostImageRes>(res);
}

/**
 * S3로 이미지를 업로드합니다.
 * @param file required; File
 * @param presignedUrl required; string
 * @returns  */

export function usePutImage(file: File | null) {
  return useMutation(queryOptions.putImage(file));
}

/**
 * Presigned URL을 조회합니다.
 * @param presignedUrl required; string
 * @returns  */

export function useGetImage(presignedUrl: string) {
  return useSuspenseQuery(queryOptions.getImage(presignedUrl));
}
