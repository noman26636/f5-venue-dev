import { ContentState, convertFromHTML, EditorState } from 'draft-js';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
const RichtextEditor = (props) => {
    let { name,
        value,
        error,
        onChange,
        label,
        className,
        placeholder = "" } = props;
    let state = null;
    if (!value || value === "")
        state = EditorState.createEmpty();
    else {
        const blocksFromHTML = convertFromHTML(value);
        state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
        );
        state = EditorState.createWithContent(state);
    }
    const [editorState, setEditorState] = useState(state);
    const handleEditorChange = (edState) => {
        setEditorState(edState);
        const content = edState.getCurrentContent();
        const valueObj = { target: { value: convertToHTML(content), name: name } }
        onChange(valueObj);
    }
    return (
        <div className={`input-wrapper ${className}`}>
            {label && <div className="label">{label}</div>}
            <Editor
                editorState={editorState}
                // toolbarClassName="toolbarClassName"
                wrapperClassName="rte-wrapper"
                // editorClassName="editorClassName"
                onEditorStateChange={handleEditorChange}
                placeholder={placeholder}
            />
            {error && <div className="error-msg">{error}</div>
            }
        </div>

    );
};

export default RichtextEditor;