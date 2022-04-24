import { styled } from "@mui/material/styles";

type ContentOnlyProps = {
  content: string | "";
};

const ContentDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ContentSpan = styled("span")({
  fontSize: "18px",
  padding: "10px",
  whiteSpace: "pre-wrap",
  textAlign: 'center',
  color: "#F2FFFF",
});

function ContentOnly({ content = "" }: ContentOnlyProps) {
  return (
    <ContentDiv>
      <ContentSpan>
        {content.split('\\n').map( line => {
          return <span key={line}>{line}<br/></span>
        })}
      </ContentSpan>
    </ContentDiv>
  );
}

export default ContentOnly;
