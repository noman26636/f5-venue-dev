

import i18next, { t } from "i18next";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/logo-blue.svg";
import cookies from 'js-cookie'
import { useEffect } from "react";
import { languages } from "./languages";
import { useState } from "react";

export default function Main() {

    const [language, setLanguage] = useState()

    const navigate = useNavigate();
    
 
    const currentLanguageCode = cookies.get('i18next');
    const currentlanguage = languages.find( l => l.code === currentLanguageCode)

//     useEffect(()=> {
//         i18next.changeLanguage('en').then((t) => {
//     t('key'); 
// });
//     },[currentLanguageCode,t])

    // useEffect(()=> {
    // //   document.body.dir = currentlanguage.dir;
    // },[currentlanguage])

    return (
        <div className="mainContainer">
            <div className="mainContainerWrapper">
                <div className="header-content">
                    <img className="mainContainerImage" src={logo} alt="" />
                    <h1>Browse Venues in</h1>
                </div>
                 {languages.map((item, index) => (
                        <div key={index} className="mainContent" onClick={()=> {
                            navigate(`${currentLanguageCode}/home`)
                            i18next.changeLanguage(item.code, (err,t)=> {
                                if (err) return console.log('something went wrong loading', err);
                                t('key');
                            })}}>
                            <div>{item.code}</div>
                            <div>{item.name}</div>
                        </div>
                    ))}
            </div>
        </div>
    )
}