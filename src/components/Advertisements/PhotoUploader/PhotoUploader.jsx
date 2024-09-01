import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { uploadAdvertsPhoto } from '../../../redux/photos/operations';
import styles from './PhotoUploader.module.css';

function PhotoUploader({ adId, onPhotosChange }) {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);

        try {
            const uploadedFiles = await dispatch(uploadAdvertsPhoto({ adId, files: selectedFiles })).unwrap();
            onPhotosChange(uploadedFiles);
            setErrorMessage('')
        } catch (error) {
            console.log('Failed to upload files', error);
            setErrorMessage('Failed to upload files')
        }
    };

    return (
        <div className={styles.photoUploader}>
            <label htmlFor="photoFiles">Upload photo files</label>
            <input type="file" id="photoFiles" onChange={handleFileChange} multiple accept="image/*" />
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default PhotoUploader;