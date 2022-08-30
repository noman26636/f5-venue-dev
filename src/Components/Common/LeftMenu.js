import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LeftMenu = (props) => {
    const { menuOptions, showLeftMenu, toggleMenu, logout, setShowSignupModal, active, setActive } = props;
    const navigate = useNavigate();
    const authState = useSelector(state => {
        return state.auth;
    });
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    return (
        <>
            <div className={`menu-wrapper ${showLeftMenu ? 'menu-expand' : 'menu-collapse'}`}>
                <div className="cross-icon" onClick={() => toggleMenu(false)}>X</div>
                <ul className="menu-list">
                    {
                        menuOptions?.map((item, i) => <li className={`menu-item ${i === active ? "active" : ""}`} key={i}
                            onClick={() => { setActive(i); toggleMenu(false); navigate(item.path) }}>
                            {item.text}
                        </li>
                        )
                    }
                    {
                        window.innerWidth <= 768 &&
                        <>
                            {

                                authState?.user?.access_token ?
                                    <li className="menu-item" onClick={() => { toggleMenu(false); logout(); }} >
                                        {translations.Logout}
                                    </li>
                                    :
                                    <>
                                        <li className="menu-item" onClick={() => { toggleMenu(false); navigate("/login"); }}>
                                            {translations.Login}
                                        </li>
                                        <li className="menu-item" onClick={() => { toggleMenu(false); setShowSignupModal(true); }}>
                                            {translations.SignUp}
                                        </li>
                                    </>
                            }
                        </>
                    }

                </ul>
            </div>
            <div className={`overlay ${showLeftMenu && 'd-block'}`} onClick={() => toggleMenu(false)} ></div >
        </>
    );
};

export default LeftMenu;