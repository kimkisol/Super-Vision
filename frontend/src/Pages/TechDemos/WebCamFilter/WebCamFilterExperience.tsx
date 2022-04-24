import { ArrowRight, ImageSearch } from "@mui/icons-material";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import Content from "../../../Components/Commons/Content";
import WebCamUploadCard from "../../../Components/Cards/WebCamUploadCard";
import WebcamBeforeAfterDialog from "../../../Components/Dialog/WebcamBeforeAfterDialog";
import ResultCard from "../../../Components/Cards/ResultCard";
import { ChangeEvent, useEffect, useState } from "react";
import { IconButton, Tooltip, Switch, SwitchProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { io } from "socket.io-client";

const socketAi = io("http://70.12.130.102:5000/cnn");
const socketNormal = io("http://j6s005.p.ssafy.io:5000/normal");

const WebcamContainerDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "20px",
});

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
function WebCamFilterExperience() {
  const [dialog, setDialog] = useState<boolean>(false);
  const [showMagnify, setShowMagnify] = useState<boolean>(true);
  const [videoSrc, setVideoSrc] = useState<MediaStream | null>(null);
  const [aiImageSrc, setAiImageSrc] = useState<string | undefined>(undefined);
  const [normalImageSrc, setNormalImageSrc] = useState<string | undefined>(undefined);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | undefined>(undefined);
  const RATE = 50;
  const toggleWebcam = async (data: boolean) => {
    if (data) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { height: 3 * RATE, width: 4 * RATE } });
        setVideoSrc(new MediaStream([mediaStream.getVideoTracks()[0]]));
        return true;
      } catch {
        alert("비디오 소스에 접근할 수 없습니다.");
        setVideoSrc(null);

        return false;
      }
    } else {
      if (videoSrc) {
        videoSrc.getTracks()[0].stop();
        setVideoSrc(null);
      }
      return false;
    }
  };

  // 데이터 전송받는 부분

  useEffect(() => {
    if (videoSrc) {
      socketAi.on("message", (data) => {
        let arrayBufferView = new Uint8Array(data);
        let blob = new Blob([arrayBufferView], { type: "image/jpeg" });
        setAiImageSrc(URL.createObjectURL(blob));
      });
      socketNormal.on("message", (data) => {
        let arrayBufferView = new Uint8Array(data);
        let blob = new Blob([arrayBufferView], { type: "image/jpeg" });
        setNormalImageSrc(URL.createObjectURL(blob));
      });
    } else {
      socketAi.off();
      socketNormal.off();
      setAiImageSrc(undefined);
      setNormalImageSrc(undefined);
    }
  }, [videoSrc]);

  const sendImage = (canvasImg: string | undefined) => {
    let decodedImg: string = canvasImg !== undefined ? atob(canvasImg?.split(",")[1]) : "";
    let arr = [];
    for (let i = 0; i < decodedImg.length; i++) {
      arr.push(decodedImg.charCodeAt(i));
    }
    let img = new Blob([new Uint8Array(arr)], { type: "image/jpeg" });

    // 소켓으로 보내기
    socketAi.send(img);
    socketNormal.send(img);

    // setAiImageSrc(canvasImg)
    // setNormalImageSrc(canvasImg)
  };
  const sendMousePos = (pos: { x: number; y: number } | undefined) => {
    if (!showMagnify) return
    if (pos) {
      setMousePos(pos);
    } else {
      setMousePos(undefined);
    }
  };

  const toggleMagnify = (e: ChangeEvent<HTMLInputElement>) => {
    setShowMagnify(prev => !prev);
  };
  const toggleDialog = () => {
    setDialog((prev) => !prev);
  };
  return (
    <div className="relative container">
      <div className="center">
        <div className="d-flex flex-column align-items-center">
          <Content
            title="Try SUPER RESOLUTION on WEB CAM"
            content="실시간으로 일반 필터와 AI 필터의 웹캠 화질 개선을 느껴보세요!\n어떤 필터의 화질이 더 좋아보이나요?"
          />

          <WebcamBeforeAfterDialog
            width="960px"
            height="720px"
            aiImgSrc={aiImageSrc}
            normalImgSrc={normalImageSrc}
            open={dialog}
            handleClose={toggleDialog}
          />
          <WebcamContainerDiv>
            <div className="relative">
              <div className="webcam_magnify">
                <Tooltip title="큰화면으로 보기">
                  <span>
                    <IconButton onClick={toggleDialog} disabled={!Boolean(videoSrc)}>
                      <ImageSearch className="sub_color" />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="돋보기 켜기">
                  <span>
                    <CustomSwitch
                      onChange={toggleMagnify}
                      checked={showMagnify}
                      icon={<SearchIcon className="comp_color" sx={{ height: "20px", width: "20px" }} />}
                      disabled={!Boolean(videoSrc)}
                    />
                  </span>
                </Tooltip>
              </div>
              <WebCamUploadCard videoSrc={videoSrc} toggleWebcam={toggleWebcam} sendImage={sendImage} />
            </div>
            <ArrowRight sx={{ color: "#F2FFFF", fontSize: 50 }} />
            <ResultCard imgSrc={normalImageSrc} title="일반 필터" width="640px" height="480px" setMousePos={sendMousePos} pos={mousePos} />
            <ResultCard imgSrc={aiImageSrc} title="AI 필터" width="640px" height="480px" setMousePos={sendMousePos} pos={mousePos} />
          </WebcamContainerDiv>
        </div>
      </div>
    </div>
  );
}

export default WebCamFilterExperience;
