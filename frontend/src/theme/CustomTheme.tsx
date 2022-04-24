import { createTheme } from '@material-ui/core/styles'

const CustomTheme = createTheme({
  palette: {
    primary: {
      // 컴포넌트 기본
      main: '#5F7B84',
      // 메인 폰트 - 강조
      light: '#CEF3FF',
      dark: '#051527',
      // 서브 폰트
      contrastText: '#F2FFFF',
    },
    secondary: {
      // 기본 배경
      main: '#031214',
      // 코드 배경
      light: '#39424E',
      // 네브바
      dark: '#031214',
      // main 포트 강조
      contrastText: '#CEF3FF',
    },
  }
})

export default CustomTheme


    // error: {
    //   main: '',
    //   light: '',
    //   dark: '',
    //   contrastText: '',
    // },
    // warning: {
    //   main: '',
    //   light: '',
    //   dark: '',
    //   contrastText: '',
    // },
    // info: {
    //   main: '',
    //   light: '',
    //   dark: '',
    //   contrastText: '',
    // },
    // success: {
    //   main: '',
    //   light: '',
    //   dark: '',
    //   contrastText: '',
    // },