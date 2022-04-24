import React from "react";
// Local
import styles from "./SideBar.module.css";
import SearchBar from "../Commons/SearchBar";
import SideBarContents from "./SideBarContents";

// mui
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@material-ui/core";
// mui - list
import { Drawer, Toolbar } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
// mui - icons
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function SideBar() {
  const [clickedItems, setClickedItems] = React.useState([false, false, false]);
  const [clickedSubItems, setClickedSubItems] = React.useState([[false, false, false], [false], [false, false]]);
  const drawerWidth = 300;
  const theme = useTheme();

  function handleClick(id: any) {
    setClickedItems((prev) => {
      return prev.map((item, index) => {
        return Boolean(index === id && !item);
      });
    });
  }
  const listId = [["cnn", "super-resolution", "vmaf"], ["super-vision"], ["install", "execute"]];
  window.onscroll = (e: any) => {
    setClickedSubItems(
      listId.map((list, idx) => {
        const subList = list.map((item, idx) => {
          let element = document.getElementById(item);
          if (!element?.getBoundingClientRect()) return false;
          let result = Boolean(
            window.pageYOffset + element.getBoundingClientRect().top < window.scrollY &&
              window.scrollY <= window.pageYOffset + element.getBoundingClientRect().bottom
          );
          return result;
        });
        return subList;
      })
    );
  };
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.dark,
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List
        className="px-3 pt-4"
        id="side-bar"
        sx={{ width: "100%", maxWidth: 360, overflow: "auto", paddingTop: "20px" }}
        component="nav"
        aria-labelledby="SideBar"
        subheader={
          <SearchBar></SearchBar>
        }
      >
        {SideBarContents.map((SideBarContent: any, idx) => {
          return (
            <div className="my-1">
              
              {/* 1. 목차 */}
              <ListItemButton
                id={`side-bar-${SideBarContent.id}`}
                key={SideBarContent.title}
                onClick={() => handleClick(SideBarContent.id)}
              >
                <ListItemText
                  key={SideBarContent.title}
                  className={
                    clickedSubItems[SideBarContent.id].some((item) => item) || clickedItems[SideBarContent.id] ? styles.active : ""
                  }
                  primary={SideBarContent.title}
                />
                {clickedItems[SideBarContent.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              {/* 1-1. 세부 목차 */}
              <Collapse
                in={clickedSubItems[SideBarContent.id].some((item) => item) || clickedItems[SideBarContent.id]}
                timeout="auto"
                unmountOnExit
              >
                {SideBarContent.subtitles.map((subtitle: any, index: number) => {
                  return (
                    <ListItem
                      component="a"
                      href={subtitle.link}
                      key={subtitle.title + subtitle.id}
                      sx={{ pl: 4, color: "white", "&:hover": { color: "white" } }}
                    >
                      <ListItemText
                        key={subtitle.title + subtitle.id}
                        primary={subtitle.title}
                        className={clickedSubItems[SideBarContent.id][index] ? styles.active : ""}
                      />
                    </ListItem>
                  );
                })}
              </Collapse>
            </div>
          );
        })}
      </List>
    </Drawer>
  );
}

export default SideBar;
