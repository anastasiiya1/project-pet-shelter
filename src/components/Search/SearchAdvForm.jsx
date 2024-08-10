import { useDispatch, useSelector } from 'react-redux';
import { selectSearchQuery, selectAdvertisements } from '../../redux/advertisements/selectors';
import { setSearchQuery } from '../../redux/advertisements/slice';
import styles from './SearchAdvForm.module.css';

function SearchAdvForm() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const advSearch = useSelector(selectAdvertisements);

  const handleAdvSearch = e => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className={styles.searchContainer}>
      <label htmlFor='userQuery' className={styles.label}>Search advertisements</label>
      <input
        type="text"
        name="userQuery"
        id="userQuery"
        value={searchQuery}
        onChange={handleAdvSearch}
        placeholder="Enter to search"
        className={styles.input}
      />
      <div className={styles.results}>
        {advSearch.length > 0 ? (
          advSearch.map(advert => (
            <div key={advert.id} className={styles.advert}>
              <h3 className={styles.title}>{advert.title}</h3>
              <p className={styles.description}>{advert.description}</p>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No advertisements found</p>
        )}
      </div>
    </div>
  );
}

export default SearchAdvForm;