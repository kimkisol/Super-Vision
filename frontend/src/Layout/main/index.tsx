import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import NavBar from "../../Components/Bars/NavBar";
import "../../theme/ComponentStyles.css"
import "../../theme/ThemeStyles.css"

const MainLayout = () => {
  const APP_BAR_MOBILE = 64;
  const APP_BAR_DESKTOP = 74;

  const RootStyle = styled("div")({
    backgroundColor: "#051527",
    height: "100%",
    display: "flex",
    minHeight: "100%",
  });

  const MainStyle = styled("div")(({ theme }) => ({
    flexGrow: 1,
    color: "#F2FFFF",
    minHeight: "100%",
    width: "100%",
    paddingTop: APP_BAR_MOBILE + 24,

    // paddingBottom: theme.spacing(10),
    [theme.breakpoints.up("lg")]: {
      paddingTop: APP_BAR_DESKTOP,
    },
  }));

  return (
    <RootStyle>
      <NavBar />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
};

export default MainLayout;
