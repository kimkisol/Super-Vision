import { styled, keyframes } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import mainBackground from "../../Assets/Image/mainBackground.jpg";
import logoWhite from "../../Assets/Image/logoWhite.png";
import "./HomeMain.css";
import { useInternalRouter } from "../../Router/routing"
import Btn from "../Commons/Btn";
const PageDiv = styled("div")({
  height: "100%",
  width: "99.5vw",
  // background: `linear-gradient( rgba(5, 21, 39, 0.5), rgba(5, 21, 39, 0.5)), url(${mainBackground})`,
  background: `linear-gradient( rgba(5, 21, 39, 0.2), rgba(5, 21, 39, 0.2)), url(${mainBackground})`,
  backgroundSize: "cover",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const scroll = keyframes`
  0% { opacity: 0; }
  10% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(13px); opacity: 0;}
`
const ScrollDownIcon = styled("div")({
  position: "absolute",
  bottom: "7vh",
  width: "3px",
  padding: "7px 12px",
  height: "35px",
  border: "1.5px solid #fff",
  borderRadius: "25px",
  opacity: "0.75",
  boxSizing: "content-box",
});

const Scroller = styled("div") ({
  width: "2.5px",
  height: "8px",
  borderRadius: "25%",
  backgroundColor: "#fff",
  animationName: scroll,
  animationDuration: "2.2s",
  animationTimingFunction: "cubic-bezier(.15,.41,.69,.94)",
  animationIterationCount: "infinite",
})

function HomeMain() {
  const router = useInternalRouter();
  const onClick = () => {
    router.push("/techDemos")
  }
  return (
    <PageDiv>
      <Box component="img" src={logoWhite} sx={{ height: 102 }}></Box>
      <div className="mt-1 mb-4">
        <div className="font_3 sub_color text-center">Super Vision은 Super Resolution 기술을 이용해</div>
        <div className="font_3 sub_color text-center">이미지 및 영상의 화질을 개선하는 서비스입니다</div>
      </div>
      <div className="mb-4">
        <Btn content="GET STARTED" onClick={onClick} />
      </div>
        
      <ScrollDownIcon><Scroller></Scroller></ScrollDownIcon>
    </PageDiv>
  );
}

export default HomeMain;
