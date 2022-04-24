import BarChart from "../../Commons/BarChart";

type VmafResultProps = {
  normalVmaf: number;
  srVmaf: number;
};

function VmafResult({ normalVmaf, srVmaf }: VmafResultProps) {
  const colors = ["#39424E", "#CEF3FF"];

  return (
    <>
      {srVmaf > 0 ? (
        <div className="card-container d-flex flex-column text-center justify-content-between">
          <div className="mb-2 font_2 main_color bold">VMAF SCORE</div>
          <div className="">
            <BarChart
              indexAxis="x"
              barThickness={40}
              width="10em"
              height="24em"
              data={[normalVmaf, srVmaf]}
              labels={["일반 필터", "AI 필터"]}
              colors={colors}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default VmafResult;
