import convertDateFormat from '@/utils/convertDateFormat';

interface PostContentProps {
  post: any;
}

const PostContent = ({ post }: PostContentProps) => {
  const createdDate = convertDateFormat(post.created_at);
  const modifiedDate = convertDateFormat(post.modified_at);

  return (
    <div className='pt-16 mt-10 flex justify-center px-4 pb-15'>
      <div className='max-w-3xl w-full flex flex-col gap-5'>
        <div>
          <p className='font-bold text-3xl'>{post?.title}</p>
        </div>

        <div className='flex gap-2 justify-start'>
          {post.categories.map((item: any) => (
            <p
              key={item.categoryId}
              className='rounded-full text-sm bg-gray-200 py-2 text-gray-600 px-3'
            >
              # {item.category.category_name}
            </p>
          ))}
        </div>

        <div className='flex flex-col gap-2 pl-2 mb-10'>
          <p className='text-gray-700'>김영호</p>
          <p className='text-gray-500 text-xs sm:text-sm'>작성일 : {createdDate}</p>
          <p className='text-gray-500 text-xs sm:text-sm'>마지막 수정일 : {modifiedDate}</p>
        </div>

        <div className='pl-3'>
          <p>{post?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
