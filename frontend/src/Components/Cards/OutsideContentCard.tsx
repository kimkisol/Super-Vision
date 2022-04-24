import React from "react";
import "./OutsideContentCard.css";
import Content from "../Commons/Content";

type OutsideContentCardProps = {
  title: string;
  content: string;
  imgSrc: string;
};

function OutsideContentCard({ title, content, imgSrc }: OutsideContentCardProps) {
  return (
    <div className="card-container">
      <Content title={title} content={content} />
      <img className="card-img mt-2" src={imgSrc} alt="" />
    </div>
  );
}

export default OutsideContentCard;
