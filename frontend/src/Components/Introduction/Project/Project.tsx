import "./Project.css";

// Mui
import { useTheme } from "@material-ui/core";
import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import logo from "../../../Assets/Image/logoWhite.png";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { ReactNode } from "react";
import { useInternalRouter } from "../../../Router/routing";


// images
import HR from '../../../Assets/Image/HR.png'
import Bicubic from '../../../Assets/Image/Bicubic.png'
import Bilener from '../../../Assets/Image/Bilener.png'
import Lanczos from '../../../Assets/Image/Lanczos.png'
import Nearest from '../../../Assets/Image/Nearest.png'
import GAN from '../../../Assets/Image/GAN.png'
import Btn from "../../Commons/Btn";

const PageDiv = styled("div")({
  position: "relative",
  height: "100vh",
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
});

const sampleTitle = "아아";
const sampleContent = "에에";
const sampleImgSrc = "https://ichef.bbci.co.uk/news/640/cpsprodpb/41CF/production/_109474861_angrycat-index-getty3-3.jpg";
const filters = [
  {
    title: "",
    content: "",
    imgSrc: "",
  },
  {
    title: "",
    content: "",
    imgSrc: "",
  },
  {
    title: "",
    content: "",
    imgSrc: "",
  },
  {
    title: "",
    content: "",
    imgSrc: "",
  },
  {
    title: "",
    content: "",
    imgSrc: "",
  },
  {
    title: "",
    content: "",
    imgSrc: "",
  },
];

type sampleImgCardProps = {
  children: ReactNode;
  title: string;
  content: string;
  imgSrc: string;
};

function SampleImgCard({ title, content, imgSrc }: sampleImgCardProps) {
  const theme = useTheme();


  return (
    <Card
      id="project"
      sx={{
        bgcolor: theme.palette.primary.dark,
      }}
    >
      <CardContent className="py-1">
        <Typography className="text-center" variant="body1" color={theme.palette.primary.contrastText}>
          {title}
        </Typography>
      </CardContent>
      <CardMedia component="img" image={imgSrc}></CardMedia>
      <CardContent className="py-1">
        <Typography className="text-center" variant="body2" color={theme.palette.primary.contrastText}>
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}

function Project() {
  const router = useInternalRouter();
  function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    router.push("/Introduction/QuickStart");
  }
  return (
    <PageDiv id="super-vision">
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center mt-5">
          <div className="ms-1 me-5">
            <img className="ProjectLogo" src={logo} alt="" style={{width: "23em",}} />
            {/* <ContentOnly content={"Super Resolution 기술을 이용해\n이미지 및 영상의 화질을 개선하는 서비스입니다."} /> */}
            <div className="content mt-2" style={{marginLeft: "2em"}}>
              <div>Super Resolution 기술을 이용해</div>
              <div>이미지 및 영상의 화질을 개선하는 서비스입니다.</div>
            </div>
          </div>
          {/* <img src={compareVmaf} alt="vmaf-compare" /> */}
          <div className="d-flex flex-column mx-4">
            <div className="d-flex">
              <div className="d-flex flex-column text-center align-items-center">
                <div className="my-1 font_2 main_color">HR</div>
                <img className="cat_img" src={HR} alt="HR" />
                <div className="my-1 font_3 sub_color">(VMAF)</div>
              </div>
              <div className="d-flex flex-column text-center align-items-center">
                <div className="my-1 font_2 main_color">Bicubic</div>
                <img className="cat_img" src={Bicubic} alt="Bicubic" />
                <div className="my-1 font_3 sub_color">(80.84)</div>
              </div>
              <div className="d-flex flex-column text-center align-items-center">
                <div className="my-1 font_2 main_color">Bilener</div>
                <img className="cat_img" src={Bilener} alt="Bilener" />
                <div className="my-1 font_3 sub_color">(67.75)</div>
              </div>
            </div>
            <div className="d-flex mt-3">
              <div className="d-flex flex-column text-center align-items-center">
                <div className="my-1 font_2 main_color">Lanczos</div>
                <img className="cat_img" src={Lanczos} alt="Lanczos" />
                <div className="my-1 font_3 sub_color">(84.46)</div>
              </div>
              <div className="d-flex flex-column text-center align-items-center">
                <div className="my-1 font_2 main_color">Nearest</div>
                <img className="cat_img" src={Nearest} alt="Nearest" />
                <div className="my-1 font_3 sub_color">(78.26)</div>
              </div>
              <div className="d-flex flex-column text-center align-items-center" style={{border: "3px solid #5F7B84", borderRadius: "20px"}}>
                <div className="my-1 font_2 main_color">GAN</div>
                <img className="cat_img" src={GAN} alt="GAN" />
                <div className="my-1 font_3 sub_color">(85.58)</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center" style={{marginTop: "90px"}}>
          <Btn content="QUICK START" onClick={onClick} />
        </div>
      </div>
    </PageDiv>
  );
}

export default Project;
