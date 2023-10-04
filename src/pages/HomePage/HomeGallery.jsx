import React, { useEffect } from 'react';
import { Empty } from 'antd';
import SkeletonLoading from '../../components/SkeletonLoading';

const HomeGallery = ({ galleries = [], loading = false }) => {
  useEffect(() => {
    let $carouselGallery = $('.gallery .list'),
      $progressBar = $('.gallery .timeline .process');

    $carouselGallery.flickity({
      contain: true,
      wrapAround: false,
      freeScroll: true,
      cellAlign: 'left',
      lazyLoad: 6,
      imagesLoaded: true,
      prevNextButtons: false,
    });
    $carouselGallery.on('scroll.flickity', function (event, progress) {
      progress = Math.max(0.05, Math.min(1, progress));
      $progressBar.width(progress * 100 + '%');
    });

    let ctrPrevGallery = $('.gallery .btn_ctr.prev'),
      ctrNextGallery = $('.gallery .btn_ctr.next');

    ctrPrevGallery.on('click', function () {
      $carouselGallery.flickity('previous');
    });
    ctrNextGallery.on('click', function () {
      $carouselGallery.flickity('next');
    });
  }, [galleries]);
  return (
    <section className="gallery">
      <div className="heading --noline --center">
        <h2 className="heading__title title --t2">
          <span className="color--primary">CFD Circle</span> Là Một Team
        </h2>
      </div>
      {loading && <SkeletonLoading columns={3} />}
      {!!galleries?.images?.length && (
        <div className={`list ${loading ? 'is-loading' : 'is-loaded'}`}>
          {galleries.images.map((image) => (
            <img key={image} data-flickity-lazyload={image} />
          ))}
        </div>
      )}
      {!loading && !galleries?.images?.length && <Empty description="Không tìm thấy hình ảnh nào" />}

      <div className="controls">
        <div className="btn_ctr prev" />
        <span>Trượt qua</span>
        <div className="timeline">
          <div className="process" />
        </div>
        <div className="btn_ctr next" />
      </div>
    </section>
  );
};

export default HomeGallery;
