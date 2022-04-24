import { useState, MouseEvent } from "react";
import { Link as RouterLink, useLocation, matchPath } from "react-router-dom";
import { Button, Popper, MenuItem, Fade, Paper } from "@mui/material";

interface NavBarBtnProps {
  route: routeProps;
}

interface routeProps {
  path: string;
  name: string;
  children: Array<routeChildrenProps>;
}

interface routeChildrenProps {
  path: string;
  name: string;
}

function NavBarBtn({ route }: NavBarBtnProps) {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isCurrentPath = matchPath(location.pathname, route.path);
  const fontColor = isCurrentPath ? "#CEF3FF" : "#F2FFFF";
  const fontWeight = isCurrentPath ? "600" : "200";
  return (
    <span key={route.name} onMouseOver={handleOpen} onMouseLeave={handleClose}>
      <Button
        id={`${route.name}-btn`}
        to={route.path}
        size="large"
        sx={{ fontFamily: "Pretendard-Regular", color: fontColor, fontWeight }}
        component={RouterLink}
        className="navbar_btn"
      >
        {route.name}
      </Button>
      {route.children.length > 0 ? (
        <Popper placement="bottom" disablePortal anchorEl={anchorEl} open={open}>
          <Paper>
            {route.children.map((child) => {
              return (
                <MenuItem className="navbar_btn" key={child.name} to={`${route.path}/${child.path}`} component={RouterLink}>
                  {child.name}
                </MenuItem>
              );
            })}
          </Paper>
        </Popper>
      ) : null}
    </span>
  );
}

export default NavBarBtn;
