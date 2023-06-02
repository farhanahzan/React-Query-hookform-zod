import { useMutation, useQuery } from "@tanstack/react-query";
import CommentService from "./comment.service";
import { queryClient } from "../../../main";


export const useComments = (id:string) => useQuery({
    queryKey: ['comments'],
    queryFn:()=>CommentService.getComments(id)
})

export const useCreateComment = () => useMutation({
    mutationFn: CommentService.createComments,
    onSuccess: (data) => {
        queryClient.invalidateQueries(['comments'])
        queryClient.invalidateQueries(['posts',data.postId])
    },
    onError: (error) => {
        console.log(error)
    }

})
export const useDeleteComment = () => useMutation({
    mutationFn: CommentService.deleteComments,
    onSuccess: (data) => {
        queryClient.invalidateQueries(['comments'])
        queryClient.invalidateQueries(['posts',data.postId])
    },
    onError: (error) => {
        console.log(error)
    }

})