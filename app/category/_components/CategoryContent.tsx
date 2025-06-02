import CategoryTab from '@/app/posts/[post-id]/_components/CategoryTab';
import PostList from './PostLIst';

const CategoryContent = () => {
  return (
    <>
      <div className='flex gap-5 w-full items-stretch'>
        <div className='w-1/3 self-stretch'>
          <CategoryTab
            categories={[{ category_name: '전체', postCount: totalCount }, ...categories]}
            currentCategory={'all'}
          />
        </div>

        <div className='w-2/3'>
          <PostList />
        </div>
      </div>
    </>
  );
};

export default CategoryContent;
