import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "../Layout/main/index";

import Home from "../Pages/Home/Home";
import IntroductionMain from "../Pages/Introduction";

import TechDemosMain from "../Pages/TechDemos/TechDemosMain";
import ImageFilterMain from "../Pages/TechDemos/ImageFilter/ImageFilterMain";
import ImageFilterExperienceA from "../Pages/TechDemos/ImageFilter/ImageFilterExperienceA";
import ImageFilterExperienceB from "../Pages/TechDemos/ImageFilter/ImageFilterExperienceB";
import WebcamFilterMain from "../Pages/TechDemos/WebCamFilter/WebCamFilterMain";
import WebcamFilterExperience from "../Pages/TechDemos/WebCamFilter/WebCamFilterExperience";
import ImageFilterExperienceMainA from "../Pages/TechDemos/ImageFilter/ImageFilterExperienceMainA";
import ImageFilterExperienceMainB from "../Pages/TechDemos/ImageFilter/ImageFilterExperienceMainB";

// 화면 라우팅 테이블
export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [{ element: <Navigate to="/" replace /> }, { path: "", element: <Home /> }],
    },
    {
      path: "/Introduction",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/Introduction" replace /> },
        { path: "", element: <IntroductionMain /> },
        { path: "QuickStart", element: <IntroductionMain /> },
      ],
    },
    {
      path: "/TechDemos",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/TechDemos" replace /> },
        { path: "", element: <TechDemosMain /> },
        {
          path: "ImageFilter",
          children: [
            { element: <Navigate to="/TechDemos/ImageFilter" replace /> },
            { path: '', element: <ImageFilterMain /> },
            { path: 'A', 
              children: [
                { element: <Navigate to="/TechDemos/ImageFilter/A" replace /> },
                { path: '', element: <ImageFilterExperienceMainA />},
                { path: 'Experience', element: <ImageFilterExperienceA />},
              ]
            },
            { path: 'B', 
              children: [
                { element: <Navigate to="/TechDemos/ImageFilter/B" replace /> },
                { path: '', element: <ImageFilterExperienceMainB />},
                { path: 'Experience', element: <ImageFilterExperienceB />},
              ]
            }
          ]
        },
        {
          path: "WebCamFilter",
          children: [
            { element: <Navigate to="/TechDemos/WebCamFilter" replace /> },
            { path: "", element: <WebcamFilterMain /> },
            { path: "Experience", element: <WebcamFilterExperience /> },
          ],
        },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
