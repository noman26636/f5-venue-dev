import React from "react";
import Files from "react-butterfiles";
export default function FileUpload(props) {
    let {
        maxSize, isMultiple, onSuccess, onError
    } = props;
    return (
        <Files
            multiple={isMultiple}
            maxSize={maxSize}
            convertToBase64
            accept={["image/jpg", "image/jpeg", "image/png"]}
            onSuccess={(file) => onSuccess(file)}
            onError={errors => { onError(errors) }}
        >
            {props.children}
        </Files>
    );
}
