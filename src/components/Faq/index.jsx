import React, { useEffect } from 'react';
import SkeletonLoading from '../SkeletonLoading';
import { Empty } from 'antd';

const Faq = ({ questions = [], loading = true }) => {
  useEffect(() => {
    function accordion() {
      $(document).on('click', '.accordion .accordion__content-title', function () {
        $(this).next().stop().slideToggle(200);
        $(this).closest('.accordion__content').toggleClass('active');
        $(this)
          .closest('.accordion__content')
          .siblings('.active')
          .removeClass('active')
          .find('.accordion__content-text')
          .stop()
          .slideUp(200);
      });
    }
    accordion();
  }, []);

  const renderQuestions = (label, questions) => {
    return (
      <div className="accordion">
        <h3 className="accordion__title label">{label}</h3>
        {questions.map((question) => (
          <div key={question.id} className="accordion__content">
            <div className="accordion__content-title">
              <h4>
                <strong>{question.question}</strong>
              </h4>
            </div>
            <div className="accordion__content-text">{question.answer}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="faq --scpadding">
      <div className="container">
        <div className="faq__inner" style={{ position: 'relative' }}>
          <div className="heading --noline --center">
            <h2 className="heading__title title --t2">
              Câu hỏi <span className="color--primary">thường gặp</span>
            </h2>
          </div>
          {loading && <SkeletonLoading rows={10}/>}
          {!!questions?.length && (
            <div className="faq__list" style={{ height: loading ? '0' : 'auto', overflow: 'hidden' }}>
              {renderQuestions(
                'Thông tin chung',
                questions.filter((question) => question.sortOrder <= 6)
              )}
              {renderQuestions(
                'Đăng ký, thanh toán',
                questions.filter((question) => question.sortOrder > 6)
              )}
            </div>
          )}
          {!loading && !questions?.length && <Empty description="Không tìm thấy đánh giá nào" />}
        </div>
      </div>
    </section>
  );
};

export default Faq;
