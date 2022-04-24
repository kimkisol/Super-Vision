import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useRef, useState, useEffect } from "react";
type MagnifyProps = {
  width: string;
  height: string;
  RATIO: number;
  imgSrc: string | undefined;
  pos: { x: number; y: number } | undefined;
};

const MagnifyDiv = styled("div")({
  width: "300px",
  height: "300px",
  position: "absolute",
  boxShadow: "0px 1px 12px rgba(0, 0, 0, 0.40)",
  display: "none",
  overflow: "hidden",
  border: "2px solid",
  borderColor: "#F2FFFF",
  borderRadius: "100%",
});

function Magnify({ width, height, RATIO, imgSrc, pos }: MagnifyProps) {
  const magnifyRef = useRef<HTMLDivElement>(null);
  const [objectPosition, setObjectPosition] = useState<string>("");

  useEffect(() => {
    if (pos) {
      setMagnify();
    } else {
      if (!magnifyRef.current?.style) return;
      magnifyRef.current.style.display = "none";
    }
  }, [pos]);
  const setMagnify = () => {
    if (!pos) return;
    if (!magnifyRef.current?.style) return;
    const w = magnifyRef.current.offsetWidth / 2;
    const h = magnifyRef.current.offsetHeight / 2;
    magnifyRef.current.style.display = "inline-block";
    if (!magnifyRef.current.parentElement) return;
    magnifyRef.current.style.left = `${magnifyRef.current.parentElement?.offsetLeft + pos.x - w}px`;
    magnifyRef.current.style.top = `${magnifyRef.current.parentElement?.offsetTop + pos.y - h}px`;
    let objectPosX = -(pos.x * RATIO - w);
    let objectPosY = -(pos.y * RATIO - h);
    setObjectPosition(`${objectPosX}px ${objectPosY}px`);
  };

  return (
    <MagnifyDiv ref={magnifyRef}>
      <Box
        component="img"
        src={imgSrc}
        sx={{
          position: "relative",
          width: `${parseInt(width.substring(0, width.length - 2)) * RATIO}px`,
          height: `${parseInt(height.substring(0, height.length - 2)) * RATIO}px`,
          objectPosition,
        }}
      ></Box>
    </MagnifyDiv>
  );
}

export default Magnify;
