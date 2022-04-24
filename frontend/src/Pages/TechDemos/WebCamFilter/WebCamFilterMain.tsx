import OutsideContentCard from "../../../Components/Cards/OutsideContentCard";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { styled } from '@mui/material/styles'
import Btn from '../../../Components/Commons/Btn'
import "./WebCamFilterMain.css"
import { useInternalRouter } from '../../../Router/routing';

const PageDiv = styled('div')({
  paddingTop: '84px',
  height: '100%'
})

function WebCamFilterMain() {
  const router = useInternalRouter();
  const onClick = () => {
    router.push('/techDemos/WebcamFilter/Experience');
  }

  return (
    <div className="relative container">
      <div className="center">
        <div className="my-3" style={{textAlign: 'center', fontSize: '36px', fontWeight: "600",}}>실시간으로 당신 웹캠의 화질개선을 느껴보세요!</div>
        <div className="cards">
          <OutsideContentCard
            title="ORIGINAL"
            content={"당신의 웹캠\n화질로 보여줍니다."}
            imgSrc="https://images.pexels.com/photos/3030332/pexels-photo-3030332.jpeg"
          />
          <ArrowRightIcon className="mt-5 mx-4" sx={{ color: '#F2FFFF', fontSize: 50}}/>
          <OutsideContentCard
            title="일반 필터"           
            content={"일반적인 계산식에 의해\n개선한 화질로 보여줍니다."}
            imgSrc="https://images.pexels.com/photos/3030332/pexels-photo-3030332.jpeg"
          />
          <OutsideContentCard
            title="AI 필터"
            content={"AI 학습 모델을 학습한 계산식에 의해\n개선한 화질로 보여줍니다."}
            imgSrc="https://images.pexels.com/photos/3030332/pexels-photo-3030332.jpeg"
          />
        </div>
        <div className="my-4 text-center"> 
          <Btn
            content="지금 체험하기"
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
}

export default WebCamFilterMain;
