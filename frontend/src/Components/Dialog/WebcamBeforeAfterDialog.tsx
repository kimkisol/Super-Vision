import { Dialog, Box, DialogTitle, DialogContent, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import {useTheme} from '@material-ui/core'
type WebcamBeforeAfterDialogProps = {
  open: boolean;
  handleClose: Function;
  aiImgSrc: string | undefined;
  normalImgSrc: string | undefined;
  width: string;
  height: string;
};

const BeforeAfterDiv = styled("div")({
  position: "relative",
  borderRadius: "20px",
  border: "1.5px dashed #F2FFFF",
  overflow: "hidden",
});

function WebcamBeforeAfterDialog({ open, handleClose, aiImgSrc, normalImgSrc, width, height }: WebcamBeforeAfterDialogProps) {
  const theme = useTheme()
  const [imgWidth, setImgWidth] = useState<number>(parseInt(width.substring(0, width.length - 2)));
  const handleMove = (event: any) => {
    if (!event.currentTarget.parentElement) return;
    setImgWidth(event.clientX - 24 - event.currentTarget.parentElement.parentElement.offsetLeft);
  };



  return (
    <Dialog
      open={open}
      maxWidth="lg"
      fullWidth
      onClose={() => {
        handleClose();
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="d-flex justify-content-between px-5 pt-3 fs-4">

        <span className="m-2">일반필터</span>
        <span className="m-2">AI필터</span>
      </div>
      <DialogContent>
        <BeforeAfterDiv sx={{ width, height }} onMouseMove={handleMove}>
          <Box component="img" src={aiImgSrc} sx={{ position: "absolute", width, height, objectPosition: "left" }}></Box>
          <div
            style={{
              position: "absolute",
              zIndex: "1",
              width: imgWidth,
              height,
              overflow: "hidden",
              borderRight: "solid 2px black",
            }}
          >
            <Box component="img" src={normalImgSrc} sx={{ width, height, objectFit: "cover", objectPosition: "left" }}></Box>
          </div>
        </BeforeAfterDiv>
      </DialogContent>
    </Dialog>
  );
}

export default WebcamBeforeAfterDialog;
