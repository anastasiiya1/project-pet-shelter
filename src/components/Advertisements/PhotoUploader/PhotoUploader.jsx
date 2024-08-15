import {useState} from 'react';
import styles from './PhotoUploader.module.css'

function PhotoUploader({ onPhotosChange }) {
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState('');

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files); 

        if (files.length > 5) {
            setError('You can only upload up to 5 photos');
            return;
        }

        setError('');
        setPhotos(files);
        onPhotosChange(files);
    };

    return (
        <div className={styles.photoUploader}>
            <label htmlFor="photoFiles">Upload photo files</label>
            <input
                type="file"
                id="photoFiles"
                onChange={handlePhotoUpload}
                multiple
                accept="image/*"
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
            {photos.length > 0 && (
                <div>
                    <strong>Selected Photos:</strong>
                    <ul>
                        {photos.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PhotoUploader;