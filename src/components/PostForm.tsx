import { useForm, SubmitHandler } from 'react-hook-form';

type POST = {
  title: string;
  body: string;
};
type Props = {
  onSubmit: (data: POST) => void;
  initialValue?: POST;
};
const PostForm = (props: Props) => {
  const { onSubmit, initialValue } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<POST>({
    defaultValues: {
      title: initialValue?.title || '',
      body: initialValue?.body || '',
    },
  });

  const handlePost: SubmitHandler<POST> = (data) => {
    onSubmit(data);
    // reset({ title: '', body: '' });
  };

  return (
    <div>
      <div className="flex min-h-full w-96 flex-1 flex-col justify-center px-6 py-5 lg:px-8">
        <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(handlePost)}>
            <div>
              <div className="flex">
                <label
                  htmlFor="title"
                  className="flex-1 text-left text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                {errors.title && (
                  <p className="flex-1 text-right  text-sm text-red-600">
                    This field is required
                  </p>
                )}
              </div>

              <div className="mt-2">
                <input
                  id="title"
                  type="text"
                  {...register('title', { required: 'Title is Required' })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex ">
                <label
                  htmlFor="body"
                  className="flex-1 text-left text-sm font-medium leading-6 text-gray-900"
                >
                  Body
                </label>
                {errors.body && (
                  <p className="flex-1 text-right  text-sm text-red-600">
                    This field is required
                  </p>
                )}
              </div>

              <div className="mt-2">
                <textarea
                  id="body"
                  rows={3}
                  {...register('body', { required: 'Body is Required' })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
