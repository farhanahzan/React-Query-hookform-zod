import { useParams, useNavigate } from 'react-router-dom';
import { useDeletePost, useSinglePost } from '../V2/feature/posts/post.query';
import CommentList from './CommentList';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const deletePostMutation = useDeletePost();

  if (!id) {
    return <div>Invalid post ID</div>;
  }

  const { data: post, isLoading, isError, error } = useSinglePost(id);
  if (isLoading) return <div>...Loading</div>;
  if (isError) return <div>{`Error: ${error}`}</div>;

  const handleDelete = (id: string) => {
    console.log(id)
    try {
      deletePostMutation.mutate(id);
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/')
    }
  };
  return (
    <div className='pb-10'>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  text-left mb-10">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {post.body}
        </p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <button
              type="button"
              className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
              onClick={() => navigate(`edit`)}
            >
              Edit
            </button>
            <button
              type="button"
              className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div>
          <button
            type="button"
            className="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800"
            onClick={() => navigate(`/`)}
          >
            Back
          </button>
        </div>
      </div>
      <CommentList postId={id}/>
    </div>
  );
};

export default Post;
