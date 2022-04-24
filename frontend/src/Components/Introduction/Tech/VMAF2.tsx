import React, { useEffect, useState } from "react";
import BarChart from "../../Commons/BarChart";
import { styled } from "@mui/material/styles";
import Content from "../../Commons/Content";

const PageDiv = styled("div")({
  position: "relative",
  height: "100vh",
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
});

function VMAF2({page}: {page: number}) {
  const data: number[] = [86, 84, 81, 78, 68];
  const labels: string[] = ["SUPER VISION", "LANCZOS", "BICUBIC", "Nearest", "BILINEAR"];
  const colors: string[] = ["#CEF3FF", "#39424E", "#39424E", "#39424E", "#39424E"];
  const [rerenderKey, setRerenderKey] = useState<number>(0);

  useEffect(() => {
    if (page === 3) {
      setRerenderKey(rerenderKey + 1)
    }
    console.log('setRerenderKey', rerenderKey)
  }, [page])

  return (
    <PageDiv>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className='mb-5'>
          <Content
            title="About {{ SUPER VISION }}'s Vmaf Score"
            content={'AI 필터인 Super Vision의 Vmaf Score는\n일반 필터와 비교하였을 때 가장 높은 평균 점수를 기록하였습니다.'}
          />
        </div>
        <div style={{paddingLeft: "13em"}} key={rerenderKey}>
          <BarChart indexAxis="y" barThickness={32} width="62em" height="24em" data={data} labels={labels} colors={colors} />
        </div>
      </div>
    </PageDiv>
  );
}

export default VMAF2;
