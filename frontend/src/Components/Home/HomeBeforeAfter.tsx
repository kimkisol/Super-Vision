import { MouseEvent } from "react";
import { styled } from "@mui/material/styles";
import {useTheme} from "@material-ui/core/styles"
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import before2 from "../../Assets/Image/before2.png";
import after2 from "../../Assets/Image/after2.jpg";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const PageDiv = styled("div")({
  position: "relative",
  height: "100vh",
  width: "99.5vw",
  background: `url(${after2})`,
  backgroundSize: "cover",
  overflow: "hidden",
});
function HomeBeforeAfter() {
  const theme = useTheme()
  const [imgWidth, setImgWidth] = useState<number>(window.innerWidth / 2);
  const buttonStyle = {
    position: "absolute",
    zIndex: "2",
    left: imgWidth,
    top: "50%",
    transform: "translate(-50%)",
    cursor: "move",
  };
  const beforeTextStyle = {
    color: "#F2FFFF",
    position: "absolute",
    top: "50%",
    left: window.screen.availWidth / 2 - 100 - 200 * ((window.screen.availWidth - imgWidth) / window.screen.availWidth),
    transform: "translate(-50%, -50%)",
  };
  const AfterTextStyle = {
    color: "#CEF3FF",
    position: "absolute",
    top: "50%",
    left: window.screen.availWidth / 2 + 100 + 200 * (1 - (window.screen.availWidth - imgWidth) / window.screen.availWidth),
    transform: "translate(-50%, -50%)",
  };
  const CustomTypography = styled("span")({
    fontFamily: "Dancing Script",
    fontSize: "150px",
  });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    setImgWidth(event.clientX);
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setImgWidth(event.clientX);
  };
  return (
    <>
      <PageDiv onClick={handleClick} onMouseMove={handleMove}>
        <div
          style={{
            position: "relative",
            zIndex: "1",
            width: imgWidth,
            height: "100%",
            overflow: "hidden",
            borderRight: "solid 1px white",
          }}
        >
          <CustomTypography sx={beforeTextStyle}>Before</CustomTypography>
          <Box
            component="img"
            src={before2}
            sx={{ width: "99.5vw", height: "100%", objectFit: "cover", objectPosition: "left top" }}
          ></Box>
        </div>
        <IconButton sx={buttonStyle}>
          <ArrowLeftIcon sx={{ color: "#F2FFFF" }} />
          <ArrowRightIcon sx={{ color: "#F2FFFF" }} />
        </IconButton>
        <CustomTypography sx={AfterTextStyle}>After</CustomTypography>
      </PageDiv>
    </>
  );
}

export default HomeBeforeAfter;
