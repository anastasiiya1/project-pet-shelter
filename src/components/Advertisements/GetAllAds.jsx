import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvertisements } from '../../redux/advertisements/operations';
import { selectAdvertisements, selectIsLoading, selectError } from '../../redux/advertisements/selectors';
import AdvPhoto from './AdvPhoto';
import styles from './AdvList.module.css';

function GetAllAds() {
    const dispatch = useDispatch();
    const adverts = useSelector(selectAdvertisements);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchAdvertisements());
    }, [dispatch]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Meet our pets</h2>
            <ul className={styles.advertisementsContainer}>
                {adverts.length > 0 ? (
                    adverts.map((ad) => (
                        <li key={ad.id} className={styles.advertisementCard}>
                            <AdvPhoto adId={ad.id} thumbnailId={ad.thumbnail.id} />
                            <h3>{ad.title}</h3>
                            <p>{ad.description}</p>
                        </li>
                    ))
                ) : (
                    <p>No advertisements found.</p>
                )}
            </ul>
        </div>
    );
}

export default GetAllAds;