import { useCreatePost } from '../V2/feature/posts/post.query';
import PostForm from './PostForm';

export type POST = {
  title: string;
  body: string;
};
const AddPost = () => {
  const createPostMutation = useCreatePost();

  const handleAddPost = (post: POST) => {
    try {
      createPostMutation.mutate({
        id: crypto.randomUUID(),
        ...post,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2 className="text-lg  text-center font-bold leading-7 text-gray-900 sm:truncate sm:text-lg sm:tracking-tight">
        Add New Post
      </h2>
      <PostForm onSubmit={handleAddPost} />
    </div>
  );
};

export default AddPost;
