import React from 'react';

const CourseDetailAccordion = ({ content = [] }) => {
  return (
    <div className="accordion">
      {content.map(({ title, description }, index) => (
        <div key={index} className={`accordion__content ${index === 0 ? 'active' : ''}`}>
          <div className="accordion__content-title">
            <h4>
              <strong>{title}</strong>
            </h4>
          </div>
          <div className="accordion__content-text --transparent" style={{ display: index === 0 ? 'block' : 'none' }}>
            {!!description?.length &&
              description.map((item, index) => (
                <div key={index} className="item --lock">
                  <p>
                    <i>
                      <img src="https://cfdcircle.vn/img/iconlock.svg" alt="CFD Circle" />
                    </i>
                    <span>{item}</span>
                  </p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseDetailAccordion;
