import { useMutation, useQuery } from '@tanstack/react-query';
import PostsService from './post.service';

import { queryClient } from '../../../main';
import { Post } from './post.types';

export const usePosts = () =>
  useQuery({
    queryKey: ['posts'],
    queryFn: () => PostsService.getPosts(),
    staleTime: 1000,
  });
export const usePostsPaginated = (page: number) =>
  useQuery({
    queryKey: ['posts', page],
    queryFn: () => PostsService.getPostsPaginated(page),
    staleTime: 1000,
    keepPreviousData: true,
  });

export const useSinglePost = (id: string) =>
  useQuery({
    queryKey: ['posts', id],

    queryFn: () => PostsService.getSinglePost(id),
  });

export const useCreatePost = () =>
  useMutation({
    mutationFn: PostsService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
    onError: (error) => {
      console.log(error);
    },
  });

export const useUpdatePost = () =>
  useMutation({
    mutationFn: PostsService.updatePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['posts']);
      queryClient.setQueryData(['posts', data.id], (oldData?:Post) => {
        if (oldData) {
        const { title, body } = oldData;
          PostsService.createPost({
            id: crypto.randomUUID(),
            title: title,
            body:body
          });
        }
        
         return oldData;
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
export const useDeletePost = () =>
  useMutation({
    mutationFn: PostsService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
    onError: (error) => {
      console.log(error);
    },
  });
