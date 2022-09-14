import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pageloader from "../Common/Pageloader";
import { CmsServices } from "./CmsServices";

const CMSpage = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const [title, setTitle] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const id=props.id;
  const getPageContent = () => {
    CmsServices.getPageContent(id).then((res) => {
      setShowLoader(false);
      if (!res.isAxiosError && res?.page?.content) {
        setTitle(res.page.title)
        setData(res.page.content);
      } else navigate("/home");
    });
  };
  useEffect(() => {
       
  }, []);
  useEffect(() => {
   window.scrollTo(0, 0);
    getPageContent();
     },[props])
  return (
    <div className="cms-page">
      {showLoader && <Pageloader />}
      <h1 className="title">{title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: data,
        }}
        id="main"
      ></div>
    </div>
  );
};

export default CMSpage;
