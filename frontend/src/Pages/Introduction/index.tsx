import SideBar from "../../Components/Bars/SideBar";
import { Box } from "@mui/material";
import { useLocation, matchPath } from "react-router-dom";

import Introduction from "./Introduction";
import QuickStart from "./QuickStart";

function IntroductionMain() {
  const location = useLocation();
  return (
    <div className="d-flex">
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        {matchPath(location.pathname, "/Introduction") ? <Introduction /> : <QuickStart />}
      </Box>
    </div>
  );
}
export default IntroductionMain;
