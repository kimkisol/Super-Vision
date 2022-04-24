import { MouseEvent } from "react";
import { styled } from "@mui/material/styles";
import { useTheme } from "@material-ui/core/styles";
import { Box, IconButton } from "@mui/material";
import { useState, useRef } from "react";
import beforeImage from "../../Assets/Image/beforeImage.png";
import afterImage from "../../Assets/Image/afterImage.png";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const PageDiv = styled("div")({
  position: "relative",
  height: "100vh",
  width: "99.5vw",
  background: `url(${afterImage})`,
  backgroundSize: "cover",
  overflow: "hidden",
});

const Magnify = styled("div")({
  width: "300px",
  height: "300px",
  position: "absolute",
  boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.85), 0 0 3px 3px rgba(0, 0, 0, 0.25)",
  display: "none",
  overflow: "hidden",
  zIndex: "2",
});

function HomeBeforeAfterTest() {
  const theme = useTheme();
  const RATIO = 2;
  const magnifyRef = useRef<HTMLDivElement>(null);
  const [imgWidth, setImgWidth] = useState<number>(window.innerWidth / 2);
  const [objectPosition, setObjectPosition] = useState<string>("-10px 50px");

  const buttonStyle = {
    position: "absolute",
    zIndex: "2",
    left: imgWidth,
    top: "50%",
    transform: "translate(-50%)",
    cursor: "move",
  };
  const beforeTextStyle = {
    color: theme.palette.primary.contrastText,
    position: "absolute",
    top: "50%",
    left: window.screen.availWidth / 2 - 100 - 200 * ((window.screen.availWidth - imgWidth) / window.screen.availWidth),
    transform: "translate(-50%, -50%)",
  };
  const AfterTextStyle = {
    color: theme.palette.primary.main,
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
    setMagnify(event);
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setImgWidth(event.clientX);
  };

  const setMagnify = (event: MouseEvent<HTMLElement>) => {
    let mouseX = event.pageX - event.currentTarget.offsetLeft;
    let mouseY = event.pageY - event.currentTarget.offsetTop;
    if (!magnifyRef.current?.style) return;
    const w = magnifyRef.current.offsetWidth / 2;
    const h = magnifyRef.current.offsetHeight / 2;
    magnifyRef.current.style.display = "inline-block";
    magnifyRef.current.style.left = `${mouseX - w}px`;
    magnifyRef.current.style.top = `${mouseY - h}px`;
    setObjectPosition(`-${mouseX * RATIO - w}px -${mouseY * RATIO - h}px`);
  };

  const handleMouseLeave = () => {
    if (!magnifyRef.current?.style) return;
    magnifyRef.current.style.display = "none";
  };

  return (
    <>
      <PageDiv onClick={handleClick} onMouseMove={handleMove} onMouseLeave={handleMouseLeave}>
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
            src={beforeImage}
            sx={{ width: "99.5vw", height: "100%", objectFit: "cover", objectPosition: "left top" }}
          ></Box>
        </div>
        <IconButton sx={buttonStyle}>
          <ArrowLeftIcon sx={{ color: "#F2FFFF" }} />
          <ArrowRightIcon sx={{ color: "#F2FFFF" }} />
        </IconButton>
        <CustomTypography sx={AfterTextStyle}>After</CustomTypography>
        <Magnify ref={magnifyRef}>
          <Box
            component="img"
            src={afterImage}
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "190vw",
              height: "100vh",
              objectFit: "cover",
              objectPosition,
            }}
          ></Box>
          <div style={{ position: "relative", width: "150px", borderRight: "solid 1px white", overflow: "hidden" }}>
            <Box
              component="img"
              src={beforeImage}
              sx={{
                width: "190vw",
                height: "200vh",
                objectFit: "cover",
                objectPosition,
              }}
            ></Box>
          </div>
        </Magnify>
      </PageDiv>
    </>
  );
}

export default HomeBeforeAfterTest;
