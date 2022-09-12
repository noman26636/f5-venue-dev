import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import Pageloader from '../Common/Pageloader';
import { CmsServices } from './CmsServices';

const PrivacyPolicy = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [data, setData] = useState(null);
    const navigate=useNavigate();
    const getPrivacyPageContent=()=>{
         CmsServices.getPrivacyPageContent().then((res) => {
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
      getPrivacyPageContent(); 
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

export default PrivacyPolicy;