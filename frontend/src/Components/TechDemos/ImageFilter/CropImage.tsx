// import * as React from 'react';
// import * as ReactCrop from 'react-image-crop';
import React, { useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import axios from "axios";
import 'react-image-crop/dist/ReactCrop.css'
import Btn from "../../Commons/Btn";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CropIcon from '@mui/icons-material/Crop';
import CloseIcon from '@mui/icons-material/Close';

type CropProps = {
  parentUploadImgChange: Function;
  parentImgChange: Function;
  showCropImgModal: Function;
};

interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
  unit: 'px' | '%';
}

function CropImage({ parentUploadImgChange, parentImgChange, showCropImgModal }: CropProps) {
  // 파일 업로드
  const fileRef = useRef<HTMLInputElement>(null);
  const [originImg, setOriginImg] = useState<HTMLImageElement>();
  const [imgPreviewUrl, setImgPreviewUrl] = useState<string>("");
  const [isImgPreview, setIsImgPreview] = useState<boolean>(false);
  const [dataURL, setDataURL] = useState<string>("");

  // 크롭
  const [isCrop, setIsCrop] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [crop, setCrop] = useState<Crop>()
  // const [crop, setCrop] = useState<Crop>({
  //   unit: '%',
  //   x: 0,
  //   y: 0,
  //   width: 100,
  //   height: 100,
  // })
  
  const initialCrop = {
    unit: '%',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  }

  // 파일 업로드 아이콘 클릭
  function handleFileBtnClick(event: React.MouseEvent) {
    if (isCrop) {
      setIsCrop(!isCrop)
    }
    setIsUploading(true)
    if (fileRef.current) {
      fileRef.current.click();
      setTimeout(function () {
        setIsUploading(false)
      }, 1000)
    }
  }

  function getImage() {
    return new Promise(resolve => {
      resolve(document.querySelector("img.crop_img") as HTMLImageElement)
    })
  }
  
  function handleImgChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsUploading(false)
    event.preventDefault();

    // 사진 미리보기
    if (event.target.files) {
      const reader = new FileReader();
      const uploadFile = event.target.files[0];

      // 확장자 예외 처리
      console.log("uploadFile", uploadFile);
      if (
        String(uploadFile.type) !== "image/png" &&
        String(uploadFile.type) !== "image/jpeg" &&
        String(uploadFile.type) !== "image/jpg"
      ) {
        alert("파일 확장자는 [.png/.jpg/.jpeg] 로 끝나야 합니다.");
        return false;
      }
      // 사이즈 예외 처리
      if (uploadFile.size > 10e6) {
        alert("파일 크기는 10MB 이하로 업로드해야 합니다.");
        return false;
      }

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const temp = new Image()
          temp.src = reader.result
          const dataURL = reader.result
          setTimeout(() => {
            console.log('temp.naturalWidth', temp.naturalWidth)
            console.log('temp.naturalHeight', temp.naturalHeight)
            if (temp.naturalWidth > 1500 || temp.naturalHeight > 1500) {
              alert("파일 사이즈는 가로/세로 각각 1500px 미만이어야 합니다.");
              return
            } else {
              setImgPreviewUrl(dataURL);
              setIsImgPreview(true);
            }
          }, 300)
        }
      }
      reader.readAsDataURL(uploadFile);
    }
  }

  // dataURL을 File 형식으로 변환
  const dataURLtoFile = (dataurl: string, fileName: string) => {
    const arr = dataurl.split(',')
    if (arr[0].match(/:(.*?);/) && arr[1]) {
      const mime = arr[0].match(/:(.*?);/)![1];
      const bstr = atob(arr[1])
      if (bstr) {
        let n = bstr.length
        const u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, {type:mime});
      }
    }  
  }

  // 자른 이미지 base64 URI 반환
  function getCroppedImg(image: HTMLImageElement, crop: Crop, imgPos: DOMRect) {
    // document 상에 canvas 태그 생성
    const canvas = document.createElement("canvas");
    // canvas 영역을 잘려진 이미지 크기 만큼 조절합니다.
    canvas.width = crop.width;
    canvas.height = crop.height;
    // getContext() 메서드를 활용하여 canvas 렌더링 컨텍스트 함수 사용
    // 이 경우 drawImage() 메서드를 활용하여 이미지를 그립니다.
    const ctx = canvas.getContext("2d");

    console.log('image', image)
    console.log('crop', crop)
    if (ctx) {
      // 화면에 잘려진 이미지를 그립니다.
      const widthRate = image.naturalWidth / image.width
      const heightRate = image.naturalHeight / image.height
      ctx.drawImage(
        // 원본 이미지 영역입니다.
        image, // 원본 이미지
        // canvas 영역
        crop.x * widthRate, // 잘려진 이미지 x 좌표
        crop.y * heightRate, // 잘려진 이미지 y 좌표
        crop.width * widthRate, // 잘려진 이미지 가로 길이
        crop.height * heightRate, // 잘려진 이미지 세로 길이
        0, // 이미지 시작 x 좌표
        0, // 이미지 시작 y 좌표
        crop.width, // 이미지 가로 길이
        crop.height, // 이미지 세로 길이
      );
  
      // canvas 이미지를 base64 형식으로 인코딩된 URI 를 생성한 후 반환합니다.
      return new Promise(resolve => {
        resolve(canvas.toDataURL());
      })
    }
  }


  // 완료 버튼 클릭시
  function handleOnComplete(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!isImgPreview) {  // 이미지 업로드 안한 경우 return
      return
    }
    parentUploadImgChange(imgPreviewUrl)
    if (originImg && crop) {  // 자르기한 경우 처리
      let imgPos = originImg.getBoundingClientRect()
      getCroppedImg(originImg, crop, imgPos)!
      .then(res => {const dataURL = String(res); setDataURL(dataURL); return res}) // !!!dataURL 저장안됨
      .then(res => {return [dataURLtoFile(String(res), 'file name'), res]})
      .then(res => {
        const file = res[0] as File
        const dataURL = res[1] as string
        const data = new FormData();
        data.append("image", file!)
        showCropImgModal();
        const headers = {
          "Content-Type": "multipart/form-data",
        };
        axios({
          method: "post",
          url: "http://70.12.130.102:5000/image",
          data,
          headers,
        })
          .then((res) => {
            console.log("handleImgChange 크롭O 성공", res);
            const normalImgSrc = "data:image/jpeg;base64," + res.data.normal_upscaled;
            const normalVmaf = res.data.normal_vmaf_score;
            const srImgSrc = "data:image/jpeg;base64," + res.data.sr_upscaled;
            const srVmaf = res.data.sr_vmaf_score;
            console.log('dataURL', dataURL)
            parentImgChange(dataURL, normalImgSrc, srImgSrc, normalVmaf, srVmaf, true);
          })
          .catch((err) => {
            console.log("handleImgChange 크롭O 에러", err);
          });
      })
    } else if (originImg) {  // 자르기 안한 경우 처리
      // const form = document.forms[0];
      const data = new FormData();
      const file = dataURLtoFile(imgPreviewUrl, 'file name') as File
      data.append("image", file)
      showCropImgModal();
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      axios({
        method: "post",
        url: "http://70.12.130.102:5000/image",
        data,
        headers,
      })
        .then((res) => {
          console.log("handleImgChange 크롭x 성공", res);
          const normalImgSrc = "data:image/jpeg;base64," + res.data.normal_upscaled;
          const normalVmaf = res.data.normal_vmaf_score;
          const srImgSrc = "data:image/jpeg;base64," + res.data.sr_upscaled;
          const srVmaf = res.data.sr_vmaf_score;
          parentImgChange(imgPreviewUrl, normalImgSrc, srImgSrc, normalVmaf, srVmaf, true);
          // showCropImgModal();
        })
        .catch((err) => {
          console.log("handleImgChange 크롭x 에러", err);
        });
    }
  }

  // 백엔드 API 요청
  
  return (
    <div className="crop_modal d-flex-column">

      {/* 닫기 버튼 */}
      <div className="clickable d-flex justify-content-end" onClick={(e) => showCropImgModal()}>
        <CloseIcon className="text-right" sx={{ color: "#5F7B84", fontSize: 40 }} />
      </div>

      <div className="d-flex justify-content-around">
        {/* 크롭 */}
        <div className="crop_card sub_bg_color d-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-center align-items-center">
            {!isImgPreview &&
            <div className="comp_color text-center font_3">
              <div>10MB 이내 파일을</div>
              <div>업로드 해주세요.</div>
              <div>(jpg, jpeg, png)</div>
            </div>
            }
            {
            isImgPreview &&
            <ReactCrop 
              crop={crop} 
              onChange={c =>{setCrop(c)}}
              onComplete={c => {setCrop(c)}}
              disabled={!isCrop}
              ruleOfThirds={isCrop}
            >
              <img 
                id="crop_img"
                className="crop_img" 
                src={imgPreviewUrl} 
                alt="cropImage" 
                onLoad={e => {
                  getImage()
                  .then(res => setOriginImg(res as HTMLImageElement))
                }}
              />
            </ReactCrop>
            }
          </div>
        </div>

        <div className="d-flex flex-column text-center justify-content-between align-items-between ms-3 mt-3">
          <div className="d-flex-column">
            {/* 파일 업로드 */}
            <form id="upload" action="/">
              <input ref={fileRef} type="file" onChange={handleImgChange} hidden={true} name="image" />
            </form>
            <div className="clickable mb-3" onClick={handleFileBtnClick}>
              <FileUploadOutlinedIcon sx={{ color: !isUploading ? "#5F7B84" : "#39424E", fontSize: 50 }} />
              <div className={!isUploading ? "comp_color" : "code_color bold"}>업로드</div>
            </div>

            {/* 크롭 버튼 */}
            <div className="clickable" onClick={() => {
              setIsCrop(!isCrop)
              setCrop(initialCrop as Crop)
            }}
            >
              <CropIcon sx={{ color: !isImgPreview ? "#9fa5a8" : (!isCrop ? "#5F7B84" : "#39424E"), fontSize: 45 }} />
              <div className={!isImgPreview ? "gray_color" : (!isCrop ? "comp_color" : "code_color bold")}>자르기</div>
            </div>
          </div>

          {/* SR 요청(완료) */}
          <div className="">
            <Btn content="완료" onClick={handleOnComplete} isDisabled={!isImgPreview} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default CropImage;