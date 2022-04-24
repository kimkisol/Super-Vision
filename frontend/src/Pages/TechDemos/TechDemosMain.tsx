import { useInternalRouter } from "../../Router/routing";
import HorizontalContentCard from "../../Components/Cards/HorizontalContentCard";
// import { } from "../../../Assets/Image"

function ImageFilterMain() {
  const router = useInternalRouter();
  function onClickImageFilter(event: React.MouseEvent<HTMLButtonElement>) {
    router.push("/techDemos/ImageFilter");
  }
  function onClickWebcamFilter(event: React.MouseEvent<HTMLButtonElement>) {
    router.push("/techDemos/WebCamFilter");
  }

  const state = {
    image: {
      title: "Image Filter",
      content: "이미지에 AI 및 일반 필터를 체험할 수 있습니다.\n지금 바로 이미지를 업로드해서 Vmaf Score까지 확인하세요!",
      imgSrc: `${process.env.PUBLIC_URL}/Assets/Image/imageMain.jpg`,
      btnContent: "Try SUPER VISION on IMAGE",
    },
    webcam: {
      title: "Webcam Filter",
      content: "웹캠에 AI 및 일반 필터를 체험할 수 있습니다.\n지금 바로 웹캠을 켜서 실시간으로 화질이 개선되는 것을 확인하세요!",
      imgSrc: `${process.env.PUBLIC_URL}/Assets/Image/webcamMain.jpg`,
      btnContent: "Try SUPER VISION on WEBCAM",
    },
  };

  return (
    <>
      <div className="relative">
        <div className="center container">
          <div className="d-flex flex-column align-items-center">
            <div className="my-4">
              <HorizontalContentCard
                title={state.image.title}
                content={state.image.content}
                imgSrc={state.image.imgSrc}
                onClick={onClickImageFilter}
                btnContent={state.image.btnContent}
                reversed={true}
              />
            </div>
            <div className="my-4">
              <HorizontalContentCard
                title={state.webcam.title}
                content={state.webcam.content}
                imgSrc={state.webcam.imgSrc}
                onClick={onClickWebcamFilter}
                btnContent={state.webcam.btnContent}
                reversed={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageFilterMain;
