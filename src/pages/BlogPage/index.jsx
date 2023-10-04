import React, { useState, lazy, Suspense } from 'react';
import ComponentLoading from '../../components/ComponentLoading';
const BlogMenu = lazy(() => import('./BlogMenu'));
const BlogList = lazy(() => import('./BlogList'));
import useQuery from '../../hooks/useQuery';
import blogService from '../../services/blogService'

const BlogPage = () => {
  const { data: categoryData } = useQuery(blogService.getBlogsByCategories);
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <main className="mainwrapper blog --ptop">
      <Suspense fallback={<ComponentLoading />}>
      <div className="textbox">
        <h2 className="title --t2">Blog</h2>
      </div>

      <div className="container">
        <BlogMenu categories={categoryData?.blogs} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <BlogList selectedCategory={selectedCategory}/>
      </div>
      </Suspense>
    </main>
  );
};

export default BlogPage;
