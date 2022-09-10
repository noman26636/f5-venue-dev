import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import Pageloader from '../Common/Pageloader';
import { CmsServices } from './CmsServices';

const Terms = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [data, setData] = useState(null);
    const navigate=useNavigate();
    const getTermsPageContent=()=>{
         CmsServices.getTermsPageContent().then((res) => {
            setShowLoader(false);
            if (!res.isAxiosError) {
              setData(res);
            }
            else
           navigate("/home");
          });
    }
    useEffect(()=>{
      getTermsPageContent(); 
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

export default Terms;