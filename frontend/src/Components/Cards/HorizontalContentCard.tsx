import React from "react";
import Content from "../Commons/Content";
import { useNavigate } from "react-router-dom";
import Btn from "../Commons/Btn";

type HorizontalContentCardProps = {
  title: string;
  content: string;
  imgSrc: string;
  onClick: Function;
  btnContent: string;
  reversed: boolean;
};

function HorizontalContentCard({ title, content, imgSrc, onClick, btnContent, reversed }: HorizontalContentCardProps) {
  return (
    <div className="mx-1 margin-x">
      {reversed &&
        <div className="d-flex">
          <img className="tech_demo_img" src={imgSrc} alt="" />
          <div className="d-flex flex-column ps-5 justify-content-center">
            <div className="big_title_no_center mb-4 main_color">{title}</div>
            <span className="font_2 pre_wrap">{content.split('\\n').map( line => {
          return <span key={line}>{line}<br/></span>
        })}</span>
            <div className="my-4">
              <Btn content={btnContent} onClick={onClick} rounded={false} />
            </div>
          </div>
        </div>
      }
      {!reversed &&
        <div className="d-flex">
          <div className="d-flex flex-column pe-5 justify-content-center">
            <div className="big_title_no_center mb-4 main_color">{title}</div>
            <span className="font_2 pre_wrap">{content.split('\\n').map( line => {
          return <span key={line}>{line}<br/></span>
        })}</span>
            <div className="my-4">
              <Btn content={btnContent} onClick={onClick} rounded={false} />
            </div>
          </div>
          <img className="tech_demo_img" src={imgSrc} alt="" />
        </div>
      }
    </div>
  );
}

export default HorizontalContentCard;
