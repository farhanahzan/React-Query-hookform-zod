import { useDeletePost,  usePostsPaginated } from '../V2/feature/posts/post.query';
import { useNavigate } from 'react-router-dom';
import AddPost from '../components/AddPost';
import { useState } from 'react';

const PostList = () => {

  const [page, setPage] = useState<number>(1)
  const navigate = useNavigate();
  const deletePostMutation = useDeletePost();

  // const { data: posts, isLoading, isError, error } = usePosts();
  const { data: posts, isLoading, isError, error, isPreviousData } = usePostsPaginated(page);

  if (isLoading) return <div>...Loading</div>;
  if (isError) return <div>{`Error: ${error}`}</div>;

  const handleDelete = (id: string) => {
    try {
      deletePostMutation.mutate(id);
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/');
    }
  };
  return (
    <>
      <div className="flex flex-col w-full items-center">
        <AddPost />
        <>
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-4 mb-2 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 w-80"
            >
              <p
                onClick={() => navigate(`post/${post.id}`)}
                className="text-left text-sm font-medium truncate w-40 cursor-pointer"
              >
                {post.title}
              </p>
              <div className="flex flex-row gap-2">
                <button
                  type="button"
                  className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
                  onClick={() => navigate(`post/${post.id}/edit`)}
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
            </div>
          ))}
        </>
        <div className="mt-5 inline-flex rounded-md shadow-sm">
          <button
            
            aria-current="page"
            className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            PREV
          </button>

          <button
           
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => {
              if (!isPreviousData && posts.length ===2) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPreviousData || posts.length <2}
          >
            NEXT
          </button>
        </div>
      </div>
    </>
  );
};

export default PostList;
