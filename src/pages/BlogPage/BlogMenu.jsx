import React from 'react';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const BlogMenu = ({ categories, selectedCategory, setSelectedCategory }) => {
  const _onChangeCategory = (id) => {
    setSelectedCategory(id);
  }

  return (
    <div className="blog__menu">
      <Link onClick={() => _onChangeCategory('')} className={`blog__menu-item ${selectedCategory === '' ? 'active' : ''}`}>
        Tất cả
      </Link>
      {!!categories?.length &&
        categories.map(({ id, name }) => (
          <Link key={id} onClick={() => _onChangeCategory(id)} className={`blog__menu-item ${id === selectedCategory ? 'active' : ''}`}>
            {name}
          </Link>
        ))}
    </div>
  );
};

export default BlogMenu;
