import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const RichtextEditor = (props) => {
    const { name,
        value,
        error,
        onChange,
        label,
        className,
        placeholder = "" } = props;
    return (
        <div className={`input-wrapper ${className}`}>
            {label && <div className="label">{label}</div>}
            <Editor
                editorState={value}
                toolbarClassName="toolbarClassName"
                wrapperClassName="rte-wrapper"
                editorClassName="editorClassName"
                onEditorStateChange={onChange}
                placeholder={placeholder}
            />
            {error && <div className="error-msg">{error}</div>
            }
        </div>

    );
};

export default RichtextEditor;