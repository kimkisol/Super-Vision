
// Mui
import { useTheme } from '@material-ui/core'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Local

import Content from '../../Commons/Content'

// images
import imgAI from '../../../Assets/Image/AI.jpg'
import imgHumanEye from '../../../Assets/Image/humanEye.jpg'
import imgVmafLogo from'../../../Assets/Image/vmafLogo.jpg'
import imgNetflixLogo from'../../../Assets/Image/netflixLogo.jpg'
import ContentOnly from '../../Commons/ContentOnly'


type VMAFCardProps = {
  imgSrc: string,
  content: string
}

const PageDiv = styled("div")({
  position: "relative",
  height: "100vh",
  display: 'flex',
  width: "100%",
  justifyContent: 'center',
  alignItems: 'center'
});

function VMAFCard ({imgSrc, content}: VMAFCardProps) {
  const theme = useTheme()
  return (
    <Card
      sx = {{ 
        bgcolor: theme.palette.primary.dark,
      }}
    >
      <CardMedia
        height={215}
        component="img"
        image = { imgSrc }
      >
      </CardMedia>
      <CardContent
        className='py-3'
      >
        <ContentOnly content={content} />
      </CardContent>
    </Card>
  )
}

function VMAF1 () {
  return (
    <PageDiv id="vmaf">
      {/* 출처: https://www.nubicom.co.kr/download/download.jsp?file_name=spirent/umetrix/3.spirent_Umetrix_White_Paper_Measuring_Video_Quality_kor.pdf */}
      {/* <Grid
        container
        justifyItems= 'center'
        alignItems='center'
        >
        <Grid
          item xs = {12}
          marginBottom = { 4 }
        >
          <div className='mb-4'>
            <Content
              title='What is VMAF?'
              content={'VMAF는 인간 지각 비전 모델링과 인공지능을 결합하여\n1에서 100까지의 품질 점수를 생성하는 비디오 스코어링 시스템입니다.'}
            />
          </div>
          
        </Grid>
        <Grid item xs={1}/>
        <Grid
          item xs = {2}
          // paddingLeft = { 5 }
          justifyContent='flex-end'
        >
          <VMAFCard
            imgSrc={ imgVmafLogo }
            content='Video Multi-Method Assessment Fusion'
            />
        </Grid>
        <Grid item xs = { 1 }/>
        <Grid
          container
          item xs = { 8 }
          spacing = { 2 }
          
        >
          <Grid
            item xs = { 3 }
          >
            <VMAFCard
              imgSrc={ imgNetflixLogo }
              content={'넷플릭스에서 개발한\n비디오 품질 평가 알고리즘'}
            />
          </Grid>
          <Grid
            item xs = { 3 }
            >
            <VMAFCard
              imgSrc= { imgHumanEye }
              content={'인간 지각 비전 모델링과\n인공지능을 결합'}
              />
          </Grid>
          <Grid
            item xs = { 3 }
          >
            <VMAFCard
              imgSrc={ imgAI }
              content={'통신으로 인해 열화된 화질을\n원본에 가깝게 복원한 정도를\n수치로 측정하는 시스템'}
              />
          </Grid>

        </Grid>
      </Grid> */}

      <div className='d-flex flex-column'>
        <div className='mb-5'>
          <Content
            title='What is VMAF?'
            content={'VMAF는 인간 지각 비전 모델링과 인공지능을 결합하여\n1에서 100까지의 품질 점수를 생성하는 비디오 스코어링 시스템입니다.'}
          />
        </div>
        {/* 카드 */}
        <div className='d-flex align-items-start'>
          <div className='d-flex align-items-center justify-content-center text-center'>
            <div className='p-4 code_bg_color me-5' style={{borderRadius: 20}}>
              <div className='card_container' style={{width: "14em"}}>
                <img src={ imgVmafLogo } alt="imgVmafLogo" style={{objectFit: "cover", height: "12em", width: "14em", borderRadius: 20, marginBottom: 6}} />
                <ContentOnly content={'Video Multi-Method\nAssessment Fusion'} />
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className='card_container mx-2' style={{width: "14em"}}>
              <img src={ imgNetflixLogo } alt="imgVmafLogo" style={{objectFit: "cover", height: "12em", width: "14em", borderRadius: 20, marginBottom: 6}} />
              <ContentOnly content={'넷플릭스에서 개발한\n비디오 품질 평가 알고리즘'} />
            </div>
            <div className='card_container mx-2' style={{width: "14em"}}>
              <img src={ imgHumanEye } alt="imgVmafLogo" style={{objectFit: "cover", height: "12em", width: "14em", borderRadius: 20, marginBottom: 6}} />
              <ContentOnly content={'인간 지각 비전 모델링과\n인공지능을 결합'} />
            </div>
            <div className='card_container mx-2' style={{width: "14em"}}>
              <img src={ imgAI } alt="imgVmafLogo" style={{objectFit: "cover", height: "12em", width: "14em", borderRadius: 20, marginBottom: 6}} />
              <ContentOnly content={'열화된 화질을\n원본에 가깝게 복원한 정도를\n수치로 측정하는 시스템'} />
            </div>
          </div>
        </div>
      </div>
    </PageDiv>
  )
}

export default VMAF1