import Grid from "@mui/material/Grid";
import "./Introduction.css";
// mui
import { styled } from "@mui/material/styles";

// Local

import { useInternalRouter } from "../../Router/routing";
// 사이드 바
import { useState, useEffect } from 'react'
import Sidebar from "../../Components/Bars/SideBar";
// Pages
import CNN from "../../Components/Introduction/Tech/CNN";
import SuperResolution from "../../Components/Introduction/Tech/SuperResolution";
import VMAF1 from "../../Components/Introduction/Tech/VMAF1";
import VMAF2 from "../../Components/Introduction/Tech/VMAF2";
import Project from "../../Components/Introduction/Project/Project";
// components
import Content from "../../Components/Commons/Content";

function Introduction() {

  const [page, setPage] = useState<number>(0);
  const MIN_PAGE = 0;
  const MAX_PAGE = 4;
  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, window.innerHeight * page + 84);
  }, [page]);

  const handleScroll = (e: WheelEvent) => {
    if (e.deltaY > 0) {
      setPage((prev) => (prev + 1 > MAX_PAGE ? MAX_PAGE : prev + 1));
    } else if (e.deltaY < 0) {
      setPage((prev) => (prev - 1 < MIN_PAGE ? MIN_PAGE : prev - 1));
    }
  };
  return (
    <>
      <CNN />
      <SuperResolution />
      <VMAF1 />
      <VMAF2 page={page} />
      <Project />
    </>
  );
}

export default Introduction;
