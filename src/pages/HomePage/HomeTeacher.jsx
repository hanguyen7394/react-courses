import React, { useEffect } from 'react';
import { Empty } from 'antd';
import SkeletonLoading from '../../components/SkeletonLoading';

const HomeTeacher = ({ teachers = [], loading = true }) => {
  useEffect(() => {
    const teacherSlider = () => {
      let teacherSlider = $('.teacher .teacher__list .teacher__list-inner');
      teacherSlider.flickity({
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
        pageDots: false,
        dragThreshold: 0,
      });

      $('.teacher .control .control__next').on('click', function (e) {
        e.preventDefault();
        teacherSlider.flickity('next');
      });
      $('.teacher .control .control__prev').on('click', function (e) {
        e.preventDefault();
        teacherSlider.flickity('previous');
      });
      teacherSlider.flickity('resize');
    };

    const myTimeout = setTimeout(() => {
      if (teachers?.length) {
        teacherSlider();
      }
    }, 300);

    return () => {
      clearTimeout(myTimeout);
    };
  }, [teachers]);

  return (
    <section className="teacher --scpadding">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Đội Ngũ <span className="color--primary">CFD Circle</span>
          </h2>
          <div className="heading__content">
            <p className="text">
              Đội ngủ giảng viên và mentor tâm huyết nhiều kinh nghiệm được tích luỹ từ những dự án thực tế sẽ đồng hành
              cùng bạn xuyên suốt quá trình học và con đường phát triển sự nghiệp.
            </p>
            <div className="control">
              <div className="control__prev">
                <img src="/img/icon-btn-control.svg" alt="icon prev" />
              </div>
              <div className="control__next">
                <img src="/img/icon-btn-control.svg" alt="icon next" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="teacher__list">
        <div className="container">
          {loading && <SkeletonLoading style={{ paddingLeft: '100px' }} columns={5} />}
          {!!teachers?.length && (
            <div className={`teacher__list-inner ${loading ? 'is-loading' : 'is-loaded'}`}>
              {teachers.map((teacher) => (
                <div key={teacher.id} className="teacher__list-item">
                  <div className="img">
                    <img src={teacher.image} alt={teacher.name} />
                  </div>
                  <div className="info">
                    <p className="label">{teacher.jobTitle}</p>
                    <h3 className="title --t3">{teacher.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && !teachers?.length && <Empty description="Không tìm thấy giáo viên nào" />}
        </div>
      </div>
    </section>
  );
};

export default HomeTeacher;
