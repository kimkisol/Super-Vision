// Mui
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useTheme } from "@material-ui/core";

// Local
import CodeTextBox from "../../TextBoxes/CodeTextBox";
import "./CNN.css";
import { useState } from "react";

type Props = {
  isDark: boolean;
  onMouseOver: Function;
  onMouseLeave: Function;
};

const PageDiv = styled("div")({
  position: "relative",
  height: "100vh",
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
});

function LayerSquare({ isDark, onMouseOver, onMouseLeave }: Props) {
  const theme = useTheme();
  const dark = theme.palette.primary.main;
  const light = theme.palette.primary.main;

  return (
    <Grid marginX={-2}>
      <div className="box" onMouseOver={() => onMouseOver()} onMouseLeave={() => onMouseLeave()}>
        <div className="cnnLayer rotateY">
          <div className={"fill" + " " + (isDark ? "brightBox" : "darkBox")}></div>
        </div>
      </div>
    </Grid>
  );
}

const ExplainDiv = styled("div")({
  position: "absolute",
  bottom: "90px",
  backgroundColor: "#000000A0",
  width: "800px",
  height: "150px",
  textAlign: "center",
  transition: "all .2s",
});

function CNN() {
  const [showExplain, setShowExplain] = useState<boolean>(false);
  const [layerDescription, setLayerDescription] = useState({
    Title: "바뀌어라얍",
    Content: "바뀌는게 좋지 않겠니",
  });

  const handleMouseOver = (index: number) => {
    setLayerDescription({
      Title: explanation[index].Title,
      Content: explanation[index].Content,
    });
    setShowExplain(true);
  };
  const handleMouseLeave = () => {
    setShowExplain(false);
  };

  const explanation = [
    {
      Title: "Input",
      Content: "사용자에게 이미지를 입력받는 layer.",
    },
    {
      Title: "Convolutional Layer",
      Content: "Convolution filter를 적용시켜 이미지의 특징을 추출하는 layer.",
    },
    {
      Title: "Pooling layer",
      Content: "sub_sampling을 이용해 feature-map의 크기를 줄이고, 위치나 이동 등의 특징을 추출하는 layer.",
    },
    {
      Title: "Fully connected Layer",
      Content: "앞선 단계에서 계산된 feature 를 바탕으로 분류 작업을 시행하는 layer.",
    },
  ];

  return (
    <PageDiv id="cnn">
      <div className="d-flex align-items-center justify-content-center">
        <div style={{ marginRight: "5rem" }}>
          <h1 className="cnnName fs-1 text-start big_title">Convolution</h1>
          <h1 className="cnnName fs-1 text-start big_title">Neural</h1>
          <h1 className="cnnName fs-1 text-start big_title">Network</h1>
        </div>
        <div className="d-flex pb-3 pe-5 me-5">
          <LayerSquare isDark={true} onMouseOver={() => handleMouseOver(0)} onMouseLeave={handleMouseLeave} />
          <LayerSquare isDark={false} onMouseOver={() => handleMouseOver(1)} onMouseLeave={handleMouseLeave} />
          <LayerSquare isDark={true} onMouseOver={() => handleMouseOver(2)} onMouseLeave={handleMouseLeave} />
          <LayerSquare isDark={false} onMouseOver={() => handleMouseOver(3)} onMouseLeave={handleMouseLeave} />
        </div>
        {/* 레이어별 설명 박스가 들어갈 부분 */}
      </div>
      <ExplainDiv key={showExplain + "dkdkdk"} style={{ opacity: `${showExplain ? "1" : "0"}` }}>
        <h4 className="pt-3">{layerDescription.Title}</h4>
        <hr className="mx-2" />
        <p>{layerDescription.Content}</p>
      </ExplainDiv>
    </PageDiv>
  );
}

export default CNN;
