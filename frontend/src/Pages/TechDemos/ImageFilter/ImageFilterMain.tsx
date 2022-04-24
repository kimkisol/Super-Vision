import InsideContentCard from "../../../Components/Cards/InsideContentCard";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import OutsideContentCard from "../../../Components/Cards/OutsideContentCard";
import Btn from "../../../Components/Commons/Btn";
import { useInternalRouter } from "../../../Router/routing";
// import { } from "../../../Assets/Image"

function ImageFilterMain() {
  const router = useInternalRouter();
  function onClickA(event: React.MouseEvent<HTMLButtonElement>) {
    router.push("/techDemos/ImageFilter/A/Experience");
  }
  function onClickB(event: React.MouseEvent<HTMLButtonElement>) {
    router.push("/techDemos/ImageFilter/B/Experience");
  }

  const state = {
    A: {
      title: "Image Filter by Upload",
      content: "이미지를 업로드하고\n원하는 부분만 잘라서\nAI와 일반 필터의 차이를 볼 수 있습니다.",
      imgSrc: `${process.env.PUBLIC_URL}/Assets/Image/uploadImageThumbnail.jpg`,
    },
    B: {
      title: "Image Filter by Detect",
      content: "이미지 내 사물을 디텍팅하고\n디텍팅된 사물별로\nAI와 일반 필터의 차이를 볼 수 있습니다.",
      imgSrc: `${process.env.PUBLIC_URL}/Assets/Image/detectImageThumbnail.png`,
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
            <div className="m-5">
              <InsideContentCard
                title={state.A.title}
                content={state.A.content}
                imgSrc={state.A.imgSrc}
                onClick={onClickA}
                btnContent="지금 체험하기"
              />
            </div>
            <div className="m-5">
              <InsideContentCard
                title={state.B.title}
                content={state.B.content}
                imgSrc={state.B.imgSrc}
                onClick={onClickB}
                btnContent="지금 체험하기"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageFilterMain;
