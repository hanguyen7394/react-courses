import React, { useEffect, useState } from 'react';
import SkeletonLoading from '../../components/SkeletonLoading';
import { Empty } from 'antd';
import Pagination from '../../components/Pagination';
import blogService from '../../services/blogService';
import useDebounce from '../../hooks/useDebounce';
import useMutation from '../../hooks/useMutation';
import BlogItem from '../../components/BlogItem';

const BlogList = ({ selectedCategory }) => {
  const query = selectedCategory ? `?category=${selectedCategory}` : '';
  const {
    data: blogsData,
    loading: blogsLoading,
    execute: getBlogsByCategory,
  } = useMutation((query) => blogService.getBlogs(query));
  const loadingDebounce = useDebounce(blogsLoading, 300); //question loading
  const blogs = blogsData?.blogs || [];

  useEffect(() => {
    getBlogsByCategory(query);
  }, [query]);

  return (
    <>
      {loadingDebounce && <SkeletonLoading columns={3} />}
      {!!blogs?.length && (
        <>
          <div className={`blog__list ${loadingDebounce ? 'is-loading' : 'is-loaded'}`}>
            {blogs.map((blog) => (
              <BlogItem key={blog?.id} {...blog} />
            ))}
          </div>
          <Pagination />
        </>
      )}
      {!loadingDebounce && !blogs?.length && <Empty description="Không tìm thấy bài viết nào" />}
    </>
  );
};

export default BlogList;
