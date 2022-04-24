import React from "react";
import styles from "./InsideContentCard.module.css";
import Content from "../Commons/Content";
import { useNavigate } from "react-router-dom";
import Btn from "../Commons/Btn";

type InsideContentCardProps = {
  title: string;
  content: string;
  imgSrc: string;
  onClick: Function;
  btnContent: string;
};

function InsideContentCard({ title, content, imgSrc, onClick, btnContent }: InsideContentCardProps) {

  return (
    <div className="mx-1 margin-x text-center">
      <div className={styles.inside_card_container}>
        <img className={styles.inside_card_img} src={imgSrc} alt="" />
        <div className="mx-3">
          <Content title={title} content={content} />
        </div>
        <div className="mb-4">
          <Btn content={btnContent} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

export default InsideContentCard;
