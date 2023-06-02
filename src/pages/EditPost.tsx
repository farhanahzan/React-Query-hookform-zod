import PostForm from '../components/PostForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useSinglePost, useUpdatePost } from '../V2/feature/posts/post.query';
import { POST } from '../components/AddPost';
import { Post } from '../V2/feature/posts/post.types';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    return <div>Invalid post ID</div>;
  }

  const { data: post, isLoading, isError, error } = useSinglePost(id);

  const useUpdateMutation = useUpdatePost();

  if (isLoading) return <div>...Loading</div>;
  if (isError) return <div>{`Error: ${error}`}</div>;

  const handleUpdate = (post: POST) => {
    try {
    const updatePost=  useUpdateMutation.mutateAsync({
        id: id,
        ...post,
    })
      updatePost.then((data: Post) => {
        console.log(data)
      })
    } catch (error) {
      console.log(error);
    } finally {
      // navigate('/');
    }
  };
  

  return (
    <div className="flex flex-col w-full items-center ">
      <h2 className="text-lg  font-bold leading-7 text-gray-900 sm:truncate sm:text-lg sm:tracking-tight">
        Edit Post
      </h2>
      <PostForm onSubmit={handleUpdate} initialValue={post} />
    </div>
  );
};

export default EditPost;
