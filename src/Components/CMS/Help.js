import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import Pageloader from '../Common/Pageloader';
import { CmsServices } from './CmsServices';

const Help = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [data, setData] = useState(null);
    const navigate=useNavigate();
    const getHelpPageContent=()=>{
         CmsServices.getHelpPageContent().then((res) => {
            setShowLoader(false);
            if (!res.isAxiosError && res?.page?.content) {
              setData(res.page.content);
            }
            else
           navigate("/home");
          });
    }
    useEffect(()=>{
      window.scrollTo(0, 0);
      getHelpPageContent(); 
    },[])
    return (
        <>
              {showLoader && <Pageloader />}
        <div  dangerouslySetInnerHTML={{
            __html: data,
          }}>
        </div>
        </>
    );
};

export default Help;