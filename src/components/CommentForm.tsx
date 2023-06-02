import { useForm, SubmitHandler } from 'react-hook-form';

export type COMMENT = {
  
  body: string;
};
type Props = {
  onSubmit: (data: COMMENT) => void;
  initialValue?: COMMENT;
};
const CommentForm = (props: Props) => {
  const { onSubmit, initialValue } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<COMMENT>({
    defaultValues: {
     
      body: initialValue?.body || '',
    },
  });

  const handleComment: SubmitHandler<COMMENT> = (data) => {
    onSubmit(data);
    // reset({ title: '', body: '' });
  };

  return (
    <div>
      <div className="flex min-h-full   flex-col justify-center  py-5 ">
        <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="" onSubmit={handleSubmit(handleComment)}>
            <div>
              <div className="flex">
                <label
                  htmlFor="body"
                  className="flex-1 text-left text-sm font-medium leading-6 text-gray-900"
                >
                  Type Comment Here
                </label>
                {errors.body && (
                  <p className="flex-1 text-right  text-sm text-red-600">
                    This field is required
                  </p>
                )}
              </div>

              <div className="mt-2">
                <input
                  id="body"
                  type="text"
                  {...register('body', { required: 'Body is Required' })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='py-2'>
              <button
                type="submit"
                className="text-white bg-green-500 border border-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-white dark:hover:text-white dark:focus:ring-green-800"
                // onClick={() => navigate(`post/${post.id}/edit`)}
              >
                Add Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
