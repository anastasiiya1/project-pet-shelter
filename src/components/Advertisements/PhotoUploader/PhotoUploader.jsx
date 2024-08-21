import { useState } from 'react';
import styles from './PhotoUploader.module.css';

function PhotoUploader({ onPhotosChange }) {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        console.log(files);

        setFiles(selectedFiles);
        onPhotosChange(selectedFiles);
    };

    return (
        <div className={styles.photoUploader}>
            <label htmlFor="photoFiles">Upload photo files</label>
            <input type="file" id="photoFiles" onChange={handleFileChange} multiple accept="image/*" />
        </div>
    );
}

export default PhotoUploader;
