import React, { useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core';

export default function ToggleBtn(props) {
    const {
        name,
        title,
        value,
        error,
        onChange,
        icon,
        order,
        notFormScreen,
        customWrapper
    } = props;
    useEffect((props) => {
    })
    const AntSwitch = withStyles((theme) => ({
        root: {
            width: 50,
            height: 25,
            padding: 0,
            display: 'inline-flex',
            borderRadius: 99,
            background: '#003755',
            float: 'right'
        },
        switchBase: {
            padding: 2,
            paddingLeft: 2,
            '&$checked': {
                color: "white",
                paddingLeft: 7,
                '& + $track': {
                    opacity: 1,
                    backgroundColor: '#003755',
                    borderColor: theme.palette.primary.main,
                },
            },
        },
        thumb: {
            width: 21,
            height: 21,
            boxShadow: 'none',
            background: 'white'
        },
        track: {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: 'gray'
        },
        checked: {},
    }))(Switch);
    return (
        <>
            {notFormScreen ?

                <div className={`toggleBtnWrapper ${customWrapper}`} onClick={onChange} >
                    <div className="toggleBtnBlock">
                        <div className="title">{title}</div>
                        <AntSwitch
                            name={name}
                            checked={value}
                            // onChange={onChange}
                            className="toggleBtn"
                        />
                    </div>
                </div>
                :
                <div className="toggleBtnWrapper" style={{ order: `${order}` }}>
                    <div className="title">{title}</div>
                    <div className="toggleBtnBlock">{value ? "Yes" : "No"}
                        {icon && <img alt="" className="formFieldIcon" src={icon} width="9px" height="16px"></img>}
                        <AntSwitch
                            name={name}
                            checked={value}
                            onChange={onChange}
                            className="toggleBtn"
                        />
                    </div>
                    {error && <div className="MuiFormHelperText-root Mui-error formError">{error}</div>}
                </div>
            }
        </>
    );
}
