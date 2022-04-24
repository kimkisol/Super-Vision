import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState, MouseEvent, SyntheticEvent } from "react";
import Magnify from "../Commons/Magnify";
import DownloadIcon from '@mui/icons-material/Download';
import Btn from "../Commons/Btn";

type ImageResultCardProps = {
  page: string;
  title: string;
  file?: Blob;
  imgPreviewUrl: string;
  isImgPreview: boolean;
  setMousePos: Function;
  pos: { x: number; y: number } | undefined;
  showMagnify: boolean;
  isFiltering?: boolean;
};

function ImageResultCard({ page, title, file, imgPreviewUrl, isImgPreview, setMousePos, pos, showMagnify, isFiltering }: ImageResultCardProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (!imgPreviewUrl) return
    if (!imgRef.current) return
    let mouseX = event.pageX - imgRef.current?.getBoundingClientRect().left
    let mouseY = event.pageY - imgRef.current?.getBoundingClientRect().top;
    if (mouseX <= 0 || mouseX > event.currentTarget.offsetWidth || mouseY <= 0 || mouseY > event.currentTarget.offsetHeight) {
      setMousePos(undefined)
      return
    }
    setMousePos({x: mouseX, y: mouseY})
  };

  const setSize = (e: SyntheticEvent<HTMLImageElement>) => {
    setWidth(e.currentTarget.offsetWidth)
    setHeight(e.currentTarget.offsetHeight)
  }

  return (
    <div className="card_container">
      <div className="mb-2 font_2 main_color bold card_title">{title}</div>
      {isImgPreview && (
        <span onMouseMove={handleMove}>
          <Magnify pos={pos} imgSrc={imgPreviewUrl} RATIO={3} width={`${width}px`} height={`${height}px`} />
          <div className={showMagnify ? "" : "img_card"}>
            <img ref={imgRef} onLoad={setSize} className="full_img_card" src={imgPreviewUrl} alt="img" />
            <div className="download_img_card text-center" style={{display: showMagnify ? "none" : undefined}}>
              <a href={imgPreviewUrl} download={title === "AI 필터" ? "Super Vision" : "Normal Filter"} className="text-decoration-none">
                <div className="clickable">
                  <DownloadIcon sx={{ color: "#5F7B84", fontSize: 70 }} />
                </div>
                <div>
                  <Btn content="사진 다운로드" />
                </div>
              </a>
            </div>
          </div>
        </span>
      )}
      {!isImgPreview && page === 'A' && (
        <div className={"blank_card font_3 comp_color text-center pre_wrap"}>
          <div>{"사진을 업로드하면\n결과를 확인할 수 있습니다."}</div>
        </div>
        )
      }
      {!isImgPreview && page === 'B' && (
        <div className="blank_card font_3 comp_color text-center pre_wrap">
          <div>{"디텍팅한 박스를 클릭하면\n결과를 확인할 수 있습니다."}</div>
        </div>
        )
      }
      {/* {!isImgPreview && page === 'A' && (
        <div className={"blank_card font_3 comp_color text-center pre_wrap"}>
          <div>{"사진을 업로드하면\n결과를 확인할 수 있습니다."}</div>
        </div>
        )
      }
      {!isImgPreview && page === 'B' && (
        <div className="detect_blank_card font_3 comp_color text-center pre_wrap">
          <div>{"디텍팅한 박스를 클릭하면\n결과를 확인할 수 있습니다."}</div>
        </div>
        )
      } */}
    </div>
  );
}

export default ImageResultCard;
