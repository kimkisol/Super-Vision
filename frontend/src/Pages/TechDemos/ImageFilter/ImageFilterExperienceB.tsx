import { useState, useRef } from "react";
import ImageUploadCard from "../../../Components/Cards/ImageUploadCard";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ImageResultCard from "../../../Components/Cards/ImageResultCard";
import Content from "../../../Components/Commons/Content";
import VmafResult from "../../../Components/TechDemos/ImageFilter/VmafResult";
import CropImage from "../../../Components/TechDemos/ImageFilter/CropImage";
import { Switch, SwitchProps, Tooltip, SvgIconProps, SvgIcon } from "@mui/material";
import { styled } from "@mui/material/styles";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const SearchIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <path
        fill="currentColor"
        d="M15.5,14L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5M9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14M12,10H10V12H9V10H7V9H9V7H10V9H12V10Z"
      />
    </SvgIcon>
  );
};

const CustomSwitch = styled((props: SwitchProps) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 42,
    height: 22,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(17px)",
        color: "#fff",
        "& .MuiSwitch-thumb": {
          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' style='width:10px;height:10px' viewBox='0 0 22 22'><path fill='${encodeURIComponent('#5F7B84',)}' d='M15.5,14L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5M9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14M12,10H10V12H9V10H7V9H9V7H10V9H12V10Z' /></svg>")`,
        },
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#5F7B84",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 19,
      height: 19,
    },
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#5F7B84",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  })
);

function ImageFilterExperienceB() {
  const [parentImgPreviewUrl, setParentImgPreviewUrl] = useState<string>("");
  const [isImgPreview, setIsImgPreview] = useState<boolean>(false);
  const [originImg, setOriginImg] = useState<string>("");
  const [croppedImg, setCroppedImg] = useState<string>("");
  const [normalImg, setNormalImg] = useState<string>("");
  const [srImg, setSrImg] = useState<string>("");
  const [normalVmaf, setNormalVmaf] = useState<number>(0);
  const [srVmaf, setSrVmaf] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | undefined>(undefined);
  const [showMagnify, setShowMagnify] = useState<boolean>(true);

  const fileRef = useRef<HTMLInputElement>(null);

  const title: string = "Try SUPER VISION on {{ DETECTED IMAGE }}";
  const content: string =
    "이미지 내 사물을 디텍팅해서 일반 필터와 AI 필터의 화질 개선을 직접 확인하세요!\n디텍팅한 박스를 클릭하면 화질 개선을 확인할 수 있습니다.";

  function parentImgChange(
    croppedImg: string,
    normalImg: string,
    srImg: string,
    normalVmaf: string,
    srVmaf: string,
    isImgPreview: boolean
  ): void {
    // setOriginImg(originImg)
    setCroppedImg(croppedImg)
    setNormalImg(normalImg);
    setSrImg(srImg);
    setNormalVmaf(parseInt(normalVmaf));
    setSrVmaf(parseInt(srVmaf));
    setIsImgPreview(isImgPreview);
  }

  const sendMousePos = (pos: { x: number; y: number } | undefined) => {
    if (!showMagnify) return
    if (pos) {
      setMousePos(pos);
    } else {
      setMousePos(undefined);
    }
  };

  const toggleMagnify = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowMagnify(prev => !prev);
  };

  function handleFileBtnClick(event: React.MouseEvent) {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  function handleImgChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    // 사진 미리보기
    if (event.target.files) {
      const reader = new FileReader();
      const uploadFile = event.target.files[0];

      // 확장자 예외 처리
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
          setParentImgPreviewUrl(reader.result);
          setIsImgPreview(true);
        }
      };
      reader.readAsDataURL(uploadFile);

    }
  }

  return (
    <>
      <div className="relative container">
        <div className="center">
          <Content title={title} content={content} />
          <div className="cards mt-5">
            <div className="d-flex flex-column">
              <div className="origin_card_txt">

                <div className="magnify">
                  <Tooltip title="돋보기 켜기">
                    <span>
                      <CustomSwitch
                        onChange={toggleMagnify}
                        checked={showMagnify}
                        icon={<SearchIcon className="comp_color" sx={{ height: "20px", width: "20px" }} />}
                        disabled={!isImgPreview}
                      />
                    </span>
                  </Tooltip>
                </div>

              </div>
              <ImageUploadCard page="B" originImg={originImg} parentImgChange={parentImgChange} parentImgPreviewURL={parentImgPreviewUrl} />
            </div>
            <ArrowRightIcon className="mt-5 mx-5" sx={{ color: "#F2FFFF", fontSize: 50 }} />
            <div className="me-5">
              <ImageResultCard
                page="B"
                title="일반 필터"
                imgPreviewUrl={normalImg}
                isImgPreview={isImgPreview}
                setMousePos={sendMousePos}
                pos={mousePos}
                showMagnify={showMagnify}
              />
            </div>
            <div className="mx-3">
              <ImageResultCard
                page="B"
                title="AI 필터"
                imgPreviewUrl={srImg}
                isImgPreview={isImgPreview}
                setMousePos={sendMousePos}
                pos={mousePos}
                showMagnify={showMagnify}
              />
            </div>
            <VmafResult normalVmaf={normalVmaf} srVmaf={srVmaf} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageFilterExperienceB;
