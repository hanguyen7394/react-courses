import React from 'react';
import CourseDetailAccordion from './CourseDetailAccordion';
import CourseDetailTeacher from './CourseDetailTeacher';

const CourseDetailContent = ({ description, startDate, schedule, content, required, teams }) => {
  return (
    <section className="contentdetail">
      <div className="content">
        <div className="container">
          <div className="contentrow ctintro">
            <h3 className="contentrow__title title --t3">Giới thiệu</h3>
            <div className="contenteditor" dangerouslySetInnerHTML={{ __html: description }} />

            <div className="videowrap">
              <iframe
                title="YouTube video player"
                src="https://www.youtube.com/embed/C7GoVPoamdM?rel=0"
                width={560}
                height={315}
                frameBorder={0}
                allowFullScreen="allowfullscreen"
              />
            </div>
          </div>

          <div className="contentrow ctschedule">
            <h3 className="contentrow__title title --t3">Lịch học</h3>
            <div className="ctschedule__box">
              <div className="info">
                <div className="labeltext">
                  <span className="label --blue">Khai giảng</span>
                  <p className="title --t3">{startDate}</p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Ngày học</span>
                  <p className="title --t3">{schedule?.days}</p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Thời gian</span>
                  <p className="title --t3">{schedule?.time}</p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Địa điểm</span>
                  <p className="title --t3">{schedule?.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contentrow ctlession">
            <h3 className="contentrow__title title --t3">Nội dung khoá học</h3>
            {!!content?.length && <CourseDetailAccordion content={content} />}
          </div>

          <div className="contentrow ctrequest">
            <h3 className="contentrow__title title --t3">Yêu cầu cần có</h3>
            <div className="ctrequest__content">
              {required?.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>

          <div className="contentrow ctteacher">
            <h3 className="contentrow__title title --t3">Giảng viên</h3>
            {!!teams?.length && <CourseDetailTeacher teams={teams} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailContent;
