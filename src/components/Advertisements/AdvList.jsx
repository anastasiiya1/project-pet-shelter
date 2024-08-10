import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvertisements, deleteAdvertisement } from '../../redux/advertisements/operations';
import { selectAdvertisements, selectIsLoading, selectError } from '../../redux/advertisements/selectors';
import AdvForm from './AdvForm';
import AdvItem from './AdvItem'; // Імпорт нового компонента
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
                {adverts.length > 0 ? (
                    adverts.map((ad) => (
                        <AdvItem 
                            key={ad.id} 
                            ad={ad} 
                            onDelete={handleDelete} 
                        />
                    ))
                ) : (
                    <p>No advertisements found.</p>
                )}
            </ul>
        </div>
    );
}

export default AdvList;