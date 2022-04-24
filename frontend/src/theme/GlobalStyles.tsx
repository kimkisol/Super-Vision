import { GlobalStyles as GlobalThemeStyles, useTheme } from '@mui/material';

export default function GlobalStyles() {
  const theme = useTheme()
  return (
    <GlobalThemeStyles
      styles={{
        
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        },
        html: {
          width: '100%',
          height: '100%',
          background: "#051527",
          WebkitOverflowScrolling: 'touch',
          "&::-webkit-scrollbar": {
            width: "0.5vw"
          },
          // "&::-webkit-scrollbar-track": {
          //   backgroundColor: "#e4e4e4",
          //   borderRadius: "100px",
          // },
          "&::-webkit-scrollbar-thumb" : {
            borderRadius: "100px",
            backgroundColor: "#5F7B84",
            boxShadow: "inset 2px 2px 5px 0 rgba(#fff, 0.5)"
          },
        },
        body: {
          width: '100%',
          height: '100%'
        },
        '#root': {
          width: '100%',
          height: '100%'
        },
      }}
    />
  );
}
