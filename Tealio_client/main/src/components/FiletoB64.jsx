import React, { useState } from 'react';

const FileToBase64 = () => {
    const [fileData, setFileData] = useState([]);

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            getBase64(file, (base64) => {
                setFileData([...fileData, { name: file.name, base64 }]);
            });
        }
    };

    const handleRetrieve = () => {
        fileData.forEach(({ name, base64 }) => {
            const file = dataURLtoFile(base64, name);
            console.log(file);
            // You can now use the file object as needed, e.g., upload it, save it, etc.
        });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleRetrieve}>Retrieve and Convert</button>
            <div id="base64Table">
                <table border="1">
                    <thead>
                        <tr>
                            <th>Filename</th>
                            <th>Base64 Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.base64}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FileToBase64;
