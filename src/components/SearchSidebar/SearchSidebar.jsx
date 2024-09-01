import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/categories/operations';
import { setSearchQuery } from '../../redux/advertisements/slice';
import { selectFilteredAdvertisements,selectIsLoading, selectError } from '../../redux/advertisements/selectors';
import { selectCategories } from '../../redux/categories/selectors';
import { selectSearchQuery } from '../../redux/advertisements/selectors';

const SearchSidebar = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const filteredAdvertisements = useSelector(selectFilteredAdvertisements);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
	const searchQuery = useSelector(selectSearchQuery);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            setSearchQuery({
                ...searchQuery,
                [name]: value
            })
        );
    };

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <form>
                <select name="categoryId" onChange={handleFilterChange}>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {/* Додайте інші фільтри тут */}
                <input type="text" name="priceRange.min" placeholder="Min Price" onChange={handleFilterChange} />
                <input type="text" name="priceRange.max" placeholder="Max Price" onChange={handleFilterChange} />
                <button type="submit">Search</button>
            </form>
            <div>
                {filteredAdvertisements.map((ad) => (
                    <div key={ad.id}>
                        <h3>{ad.title}</h3>
                        <p>{ad.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchSidebar;
