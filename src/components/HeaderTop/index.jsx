import { useEffect } from "react";
import Button from "../Button";

const HeaderTop = ({ id, image, name, teacher = {}, price, orderPath }) => {
  useEffect(() => {
    function showHeadCourseDetail() {
      let buttonRegister = $(".herodetail .btn");
      if (buttonRegister.length) {
        let headtop = $(".headtop");
        let headProgress = $(".headtop__progress");
        let offsetHead = buttonRegister.offset().top;
        let pageHeight = $(document).height() - $(window).height();
        let scrollTop = $(window).scrollTop(); // y

        let progress = (scrollTop / pageHeight) * 100;

        if (offsetHead <= scrollTop) {
          headtop.addClass("show");
        } else {
          headtop.removeClass("show");
        }
        headProgress.css({
          width: progress + "%",
        });
      }
    }
    function coursePage() {
      if ($(".coursedetailpage").length) {
        showHeadCourseDetail();
        $(window).on("scroll", function () {
          showHeadCourseDetail();
        });
      }
    }
    coursePage();
  }, [id]);

  return (
    <div className="headtop">
      <div className="container-fluid">
        <div className="headtop__left">
          <div className="headtop__left-avatar">
            <img src={image || ""} />
          </div>
          <div className="headtop__left-title">
            <h2>
              <strong>{name || ""}</strong>
            </h2>
            <p>{teacher.name || ""}</p>
          </div>
        </div>
        <div className="headtop__right">
          <div className="headtop__right-price">
            <strong>{price} VND</strong>
          </div>
          <Button link={orderPath} className="btn-regcourse">
            đăng ký học
          </Button>
        </div>
      </div>
      <div className="headtop__progress" />
    </div>
  );
};

export default HeaderTop;