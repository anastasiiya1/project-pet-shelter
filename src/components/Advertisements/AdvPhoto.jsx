import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvertThumbnail } from '../../redux/photos/operations';
import { selectIsLoading, selectError } from '../../redux/photos/selectors';
import styles from './AdvPhoto.module.css';

function AdvPhoto({ adId, thumbnailId }) {
    const dispatch = useDispatch();
    const [photoUrl, setPhotoUrl] = useState('');
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
		const fetchThumbnail = async () => {
			try {
				const url = await dispatch(getAdvertThumbnail({ adId, thumbnailId })).unwrap();
				// console.log('Fetched url:', url);
				setPhotoUrl(url);
			} catch (error) {
				console.log('Failed to fetch thumbnail:', error);
			}
		};
        fetchThumbnail();
    }, [adId, thumbnailId, dispatch]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message || 'An error occurred'}</p>;

    return (
        <div className={styles.photoContainer}>
            {photoUrl ? <img src={photoUrl} alt={photoUrl} className={styles.adPhoto} /> : <p>No photo available</p>}
        </div>
    );
}

export default AdvPhoto;
