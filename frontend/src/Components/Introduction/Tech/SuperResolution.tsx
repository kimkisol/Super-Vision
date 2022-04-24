import { styled } from "@mui/material/styles";
import explainSuperResolution2 from "../../../Assets/Image/explainSuperResolution2.png";
import Content from "../../../Components/Commons/Content";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Grid from "@material-ui/core/Grid";

import OutsideContentCard from "../../../Components/Cards/OutsideContentCard";

const PageDiv = styled("div")({
  position: "relative",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
});

function SuperResolution() {
  return (
    <PageDiv id="super-resolution">
      <Content
        title="About SUPER RESOLUTION"
        content="이미지 확대시 기본적으로 적용되는 Sampling Grid 
            보다 더 높은 해상도의 이미지를 만들기 위해\n
            AI를 통해 계산식을 학습하여 정교한 해상도의
            이미지를 만들어 내는 기술."
      />
      <img style={{height: '20rem', marginTop: '4rem'}} src={explainSuperResolution2} alt="explainSuperResolution" />
    </PageDiv>
  );
}

export default SuperResolution;
