import React from 'react';
import SkeletonLoading from '../../components/SkeletonLoading';
import { Empty } from 'antd';
import { ROLE } from '../../constant/common';

const AboutTeachers = ({ teachers = [], loading = true }) => {
  return (
    <section className="aboutteachers --scpadding">
      <div className="container">
        <h2 className="aboutteachers__title title --t2">
          đội ngũ <span className="color--primary">giảng viên và Mentor</span>
        </h2>
        {loading && <SkeletonLoading />}
        {!!teachers?.length && (
          <div className={`aboutteachers__list ${loading ? 'is-loading' : 'is-loaded'}`}>
            {teachers?.map(({ id, image, name, jobTitle, tags, description }) => (
              <div key={id} className="itemteacher">
                <div className="itemteacher__avatar">
                  <img
                    src={image || 'https://cfdcircle.vn/files/avatars/VAOXpQdhq3yNvBMQlDItAYKU29ZO0gsxPTxdryL5.jpg'}
                    alt="CFD Circle"
                  />
                </div>
                <div className="itemteacher__info">
                  <div className="itemteacher__info-name">
                    <p className="title --t3">{name}</p>
                    {tags?.length &&
                      tags?.map((tag, index) => (
                        <span key={index} className={`label badge ${tag == ROLE.TEACHER ? '--teacher' : '--mentor'}`}>{tag}</span>
                      ))}
                  </div>
                  <h5 className="itemteacher__info-pos label">{jobTitle}</h5>
                  <p className="itemteacher__info-des">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && !teachers?.length && <Empty description="Không tìm thấy giảng viên nào" />}
      </div>
    </section>
  );
};

export default AboutTeachers;
