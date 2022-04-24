import { useEffect, useState } from "react";

import HomeMain from "../../Components/Home/HomeMain";
import HomeBeforeAfter from "../../Components/Home/HomeBeforeAfter";

function Home() {
  const [page, setPage] = useState<number>(0);
  const MIN_PAGE = 0;
  const MAX_PAGE = 1;
  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, window.innerHeight * page);
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
      <HomeMain />
      <HomeBeforeAfter />
    </>
  );
}

export default Home;
