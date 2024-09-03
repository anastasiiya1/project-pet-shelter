import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvertisements, deleteAdvertisement } from '../../redux/advertisements/operations';
import { selectAdvertisements, selectIsLoading, selectError } from '../../redux/advertisements/selectors';
import { selectSelectedFilters } from '../../redux/categories/selectors';
import { toggleFilter } from '../../redux/categories/slice';
import CreateAdvForm from '../CreateAdvForm/CreateAdvForm';
import AdvPhoto from './AdvPhoto';
import SearchSidebar from '../SearchSidebar/SearchSidebar';
import styles from './AdvList.module.css';

function AdvList() {
    const dispatch = useDispatch();
    const adverts = useSelector(selectAdvertisements);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const filters = useSelector(selectSelectedFilters);

    useEffect(() => {
        dispatch(fetchAdvertisements());
    }, [dispatch]);

    // Фільтрація даних
    const filteredAdverts = useMemo(() => {
        // console.log('Applied filters:', filters);
        // console.log('Advertisements:', adverts);
        if (!filters || filters.length === 0) {
            return adverts;
        } else {
            return adverts.filter((ad) => {
                // console.log('Checking ad:', ad);
                return filters.includes(ad.categoryId.toString());
            });
        }
    }, [adverts, filters]);

    const handleDelete = (id) => {
        dispatch(deleteAdvertisement(id));
    };

    const handleFilterChange = (newFilter) => {
        dispatch(toggleFilter(newFilter));
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.mainContainer}>
            <SearchSidebar onFilterChange={handleFilterChange} />
            <div className={styles.advertisementsContainer}>
                <CreateAdvForm />
                <h2>Advertisements</h2>
                <ul className={styles.advertisementsList}>
                    {filteredAdverts.length > 0 ? (
                        filteredAdverts.map((ad) => (
                            <li key={ad.id} className={styles.advertisementItem}>
                                <AdvPhoto adId={ad.id} thumbnailId={ad.thumbnail.id} />
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
        </div>
    );
}

export default AdvList;
