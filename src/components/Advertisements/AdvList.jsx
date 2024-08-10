import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvertisements, deleteAdvertisement } from '../../redux/advertisements/operations';
import { selectAdvertisements, selectIsLoading, selectError } from '../../redux/advertisements/selectors';
import AdvForm from './AdvForm';
import AdvPhoto from './AdvPhoto';
import styles from './AdvList.module.css';

function AdvList() {
    const dispatch = useDispatch();
    const adverts = useSelector(selectAdvertisements);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchAdvertisements());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteAdvertisement(id));
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.advertisementsContainer}>
            <AdvForm />
            <h2>Advertisements</h2>
            <ul className={styles.advertisementsList}>
                {Array.isArray(adverts) && adverts.length > 0 ? (
                    adverts.map((ad) => (
                        <li key={ad.id} className={styles.advertisementItem}>
                            <AdvPhoto adId={ad.id} thumbnailId={ad.thumbnail.id}/>
                            <h3>{ad.title}</h3>
                            <p>{ad.description}</p>
                            <button onClick={() => handleDelete(ad.id)} className={styles.deleteButton}>
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No advertisements found.</p>
                )}
            </ul>
        </div>
    );
}

export default AdvList;
