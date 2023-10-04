import React from 'react';

const CourseDetailTeacher = ({ teams = [] }) => {
  return (
    <div className="ctteacher__content">
      {teams?.map((team) => {
        const { id, name, image, description, jobTitle, tags } = team || {};
        const tag = tags[0];
        return (
          <div className="itemteacher" key={id}>
            <div className="itemteacher__avatar">
              <img src={image} alt="CFD Circle" />
            </div>
            <div className="itemteacher__info">
              <div className="itemteacher__info-name">
                <p className="title --t3">{tag}</p>
                <span className="label badge --teacher">{name}</span>
              </div>
              <h5 className="itemteacher__info-pos label">{jobTitle}</h5>
              <p className="itemteacher__info-des">{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseDetailTeacher;
