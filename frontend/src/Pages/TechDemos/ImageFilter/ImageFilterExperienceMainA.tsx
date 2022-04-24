import InsideContentCard from "../../../Components/Cards/InsideContentCard";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import OutsideContentCard from "../../../Components/Cards/OutsideContentCard";
import Btn from "../../../Components/Commons/Btn";
import { useInternalRouter } from "../../../Router/routing";
// import { } from "../../../Assets/Image"

function ImageFilterExperienceMainA() {
  const router = useInternalRouter();
  function onClickA(event: React.MouseEvent<HTMLButtonElement>) {
    router.push("/techDemos/ImageFilter/ExperienceA");
  }
  function onClickB(event: React.MouseEvent<HTMLButtonElement>) {
    router.push("/techDemos/ImageFilter/ExperienceB");
  }

  const state = {
    origin: {
      title: "ORIGINAL",
      content: "원본 이미지 그대로인\n화질로 보여줍니다.",
      imgSrc: `${process.env.PUBLIC_URL}/Assets/Image/ImageFilterOrigin.jpg`,
    },
    normal: {
      title: "일반 필터",
      content: "일반 계산식에 의해 개선한\n화질로 보여줍니다.",
      imgSrc: `${process.env.PUBLIC_URL}/Assets/Image/ImageFilterNormal.jpg`,
    },
    gan: {
      title: "AI 필터",
      content: "GAN 필터로 개선한\n화질로 보여줍니다.",
      imgSrc: `${process.env.PUBLIC_URL}/Assets/Image/ImageFilterSr.jpg`,
    },
  };

  return (
    <>
      <div className="relative">
        <div className="center container">
          <div className="big_title">
            필터별 이미지 화질 개선을 VMAF SCORE와 함께 확인할 수 있어요!
          </div>
          <div className="cards">
            <OutsideContentCard
              title={state.origin.title}
              content={state.origin.content}
              imgSrc={state.origin.imgSrc}
            />
            <ArrowRightIcon className="mt-5 mx-4" sx={{ color: "#F2FFFF", fontSize: 50 }} />
            <OutsideContentCard
              title={state.normal.title}
              content={state.normal.content}
              imgSrc={state.normal.imgSrc}
            />
            <OutsideContentCard
              title={state.gan.title}
              content={state.gan.content}
              imgSrc={state.gan.imgSrc}
            />
          </div>
          <div className="mb-4 text-center">
            <Btn content="이미지 크롭" onClick={onClickA} />
          </div>
          <div className="mb-4 text-center">
            <Btn content="이미지 디텍팅" onClick={onClickB} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageFilterExperienceMainA;
