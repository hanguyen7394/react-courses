import React, { useState } from 'react';
import BlogMenu from './BlogMenu';
import BlogList from './BlogList';
import useQuery from '../../hooks/useQuery';
import blogService from '../../services/blogService';

const BlogPage = () => {
  const { data: categoryData } = useQuery(blogService.getBlogsByCategories);
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <main className="mainwrapper blog --ptop">
      <div className="textbox">
        <h2 className="title --t2">Blog</h2>
      </div>

      <div className="container">
        <BlogMenu
          categories={categoryData?.blogs}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <BlogList selectedCategory={selectedCategory} />
      </div>
    </main>
  );
};

export default BlogPage;
