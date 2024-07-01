import React, { useState } from 'react';

const FileToBase64 = () => {
    const [fileData] = useState([]);

    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (error) {
            console.error('Error: ', error);
        };
    };

    const dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };



    return (
        <div>
           
        </div>
    );
};

export default FileToBase64;
