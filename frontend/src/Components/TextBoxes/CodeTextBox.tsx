
import { useTheme } from '@material-ui/core'
import { styled } from "@mui/material/styles"
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

type CodeTextBoxProp = {
  Code: string,
}

function CodeTextBox ({ Code } : CodeTextBoxProp) {
  const theme = useTheme()
  return (
    <Card
      sx = {{ 
        bgcolor: theme.palette.primary.main
      }}
    >
      <CardContent
        className = 'pb-0'
      >
        <Typography 
          color = { theme.palette.primary.contrastText }
        >
          { Code }
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CodeTextBox