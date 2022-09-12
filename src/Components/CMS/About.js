import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pageloader from "../Common/Pageloader";
import { CmsServices } from "./CmsServices";

const About = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const getAboutPageContent = () => {
    CmsServices.getAboutPageContent().then((res) => {
      setShowLoader(false);
      if (!res.isAxiosError && res?.page?.content) {
        setData(res.page.content);
      } else navigate("/home");
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getAboutPageContent();
  }, []);
  return (
    <>
      {showLoader && <Pageloader />}
      <div
        dangerouslySetInnerHTML={{
          __html: data,
        }}
        id="main"
      ></div>
    </>
  );
};

export default About;
