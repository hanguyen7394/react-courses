import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogDetailTitle from './BlogDetailTitle';
import BlogDetailContent from './BlogDetailContent';
import BlogDetailRelated from './BlogDetailRelated';
import useMutation from '../../hooks/useMutation';
import blogService from '../../services/blogService';
import useDebounce from '../../hooks/useDebounce';

const BlogDetailPage = () => {
  const { blogSlug } = useParams();

  const {
    data: blogDetail,
    loading: blogDetailLoading,
    execute: getBlogDetail,
  } = useMutation(blogService.getBlogBySlug);

  const {
    data: blogsRelated,
    loading: blogsRelatedLoading,
    execute: getBlogsRelated,
  } = useMutation(() => blogService.getBlogs(query));

  const blogProps = blogDetail || {};
  const categoryId = blogProps?.category?.id;
  const query = categoryId ? `?limit=3&category=${categoryId}` : '?limit=3';

  const loadingApi = blogDetailLoading || blogsRelatedLoading;
  const loadingPage = useDebounce(loadingApi, 300);

  useEffect(() => {
    !!blogSlug && getBlogDetail(blogSlug);
  }, [blogSlug]);

  useEffect(() => {
    getBlogsRelated();
  }, [query]);

  return (
    <main className="mainwrapper blogdetail --ptop">
      <div className="container">
        <div className="wrapper">
          <BlogDetailTitle {...blogProps} />
          <BlogDetailContent {...blogProps} loading={loadingPage} />
        </div>
        <BlogDetailRelated blogs={blogsRelated?.blogs} loading={loadingPage} />
      </div>
    </main>
  );
};

export default BlogDetailPage;
