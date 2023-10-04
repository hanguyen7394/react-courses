import React from 'react';
import SkeletonLoading from '../../components/SkeletonLoading';
import { Empty } from 'antd';

const AboutGallery = ({galleries = [], loading = true}) => {
  return (
    <section className="aboutgallery --scpadding">
      <div className="container">
        <h2 className="aboutgallery__title title --t2 --white">
          CFD Circle <span className="color--primary">là một team gắn kết,</span> <br />
          cùng nhau học tập, vui chơi và phát triển
        </h2>
        {loading && <SkeletonLoading columns={4} theme='dark' />}
        {!!galleries?.images?.length && (
          <div className={`aboutgallery__imgs ${loading ? 'is-loading' : 'is-loaded'}`}>
            {galleries.images.map((image) => (
              <img key={image} src={image} alt="CFD Circle" />
            ))}
          </div>
        )}
        {!loading && !galleries?.images?.length && <Empty description="Không tìm thấy hình ảnh nào" />}
      </div>
    </section>
  );
};

export default AboutGallery;
