import React, { useState } from 'react'
import { makeStyles, TextField } from '@material-ui/core'
import eyeOff from '../../Assets/icons/eyeOff.svg'
import eyeOn from '../../Assets/icons/eyeOn.svg'
const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
    marginBottom: '3px',
    '& label.Mui-focused': {
      color: 'rgba(255, 255, 255, 0.8)'
    },
    '& .MuiInput-underline:before': {
      borderBottom: '0.6px solid rgba(255, 255, 255, 0.5) !important'
    },
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid rgba(255, 255, 255, 0.8) !important'
    },
    '& .MuiInputBase-input': {
      color: 'rgba(255, 255, 255, 0.8) !important',
      fontSize: '12px',
      fontWeight: '400',
      paddingBottom: '9px',
      fontFamily: 'Avenir Next Regular'
    },
    '& .label + .MuiInput-formControl': {
      marginTop: '13px !important',
      fontFamily: 'Avenir Next Regular'
    },
    '& .MuiFormControl-root': {
      color: 'white !important'
    }
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '500px'
  },
  textField: {
    fontSize: '12px',
    fontFamily: 'Avenir Next Regular'
  },
  textInput: {
    paddingLeft: 28,
    fontFamily: 'Avenir Next Regular'
  },
  cssLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '13px',
    paddingLeft: 28,
    fontFamily: 'Avenir Next Regular',
    '&.Mui-focused': {
      color: 'rgba(255, 255, 255, 0.8)'
    }
  },
  cssFocused: {
    color: 'rgba(255, 255, 255, 0.8)'
  }
})
export default function PasswordField(props) {
  const { name, label, value, error, onChange, icon, onKeyUp } = props
  const classes = useStyles()
  const [showPassword, setshowPassword] = useState(false)

  return (
    <div className={classes.root}>
      <img alt="" className='formFieldIcon' src={icon}></img>
      <TextField
        name={name}
        label={label}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp ? onKeyUp : undefined}
        {...(error && { error: true, helperText: error })}
        InputProps={{
          classes: { input: classes.textInput }
        }}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused
          }
        }}
      />
      {showPassword ? (
        <img
          alt=''
          className='passwordIcon'
          src={eyeOff}
          onClick={() => setshowPassword(false)}
        />
      ) : (
        <img
          alt=''
          className='passwordIcon'
          src={eyeOn}
          onClick={() => setshowPassword(true)}
        />
      )}
    </div>
  )
}
