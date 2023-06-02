import {
  useComments,
  useCreateComment,
  useDeleteComment,
} from '../V2/feature/comments/comment.query';
import CommentForm, { COMMENT } from '../components/CommentForm';
type Comment = {
    id: string
    body: string
    postId:string
}
type Props = {
  postId: string;
};
const CommentList = (props: Props) => {
  const { postId } = props;

  const { data: comments, isError, isLoading, error } = useComments(postId);

    const createCommentMutation = useCreateComment();
    const deleteCommentMutation = useDeleteComment()

  if (isLoading) return <div>...Loading</div>;
  if (isError) return <div>{`Error: ${error}`}</div>;

  const handleAddComment = (comment: COMMENT) => {
    try {
      createCommentMutation.mutate({
        id: crypto.randomUUID(),
        postId: postId,
        ...comment,
      });
    } catch (error) {
      console.log(error);
    }
    };
    
    const handleDelete = (data:Comment) => {
        try {
        deleteCommentMutation.mutate({ ...data });
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="max-w-sm  flex flex-col gap-2 w-full">
      <div>
        <CommentForm onSubmit={handleAddComment} />
      </div>

      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex items-center justify-between p-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-white border-gray-100 border-2 dark:text-blue-400  "
        >
          <p className="text-left text-sm font-medium break-all">
            {comment.body}
          </p>
          <div className="flex flex-row gap-2 pl-2">
            <button
              type="button"
              className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
               onClick={() => handleDelete(comment)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
