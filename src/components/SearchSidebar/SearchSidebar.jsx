import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getCategoryById } from '../../redux/categories/operations';
import { toggleFilter, clearFilters } from '../../redux/categories/slice';
import {
    selectCategories,
    selectSelectedFilters,
    selectIsLoading,
    selectError
} from '../../redux/categories/selectors';
import AttributesSelector from '../CategorySelector/AttributesSelector';

const SearchSidebar = ({onFilterChange}) => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const selectedFilters = useSelector(selectSelectedFilters);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    const [selectedCategoryId, setSelectedCategoryId] = useState();
    const [attributes, setAttributes] = useState([]);

    // Fetch categories only if they are not in the store and not loading
    useEffect(() => {
        if (categories.length === 0 && !isLoading) {
            dispatch(getCategories());
        }
    }, [categories, isLoading, dispatch]);

    // Fetch attributes when the selectedCategory changes
    useEffect(() => {
        const fetchAttributes = async () => {
            if (selectedCategoryId) {
                try {
                    const categoryId = Number(selectedCategoryId); // Ensure categoryId is a number
                    // console.log('Fetching attributes for categoryId:', categoryId);
                    const action = await dispatch(getCategoryById(categoryId));
                    if (getCategoryById.fulfilled.match(action)) {
                        // console.log('Fetched attributes:', action.payload.attribute); 
                        setAttributes(action.payload.attribute || []);
                    }
                } catch (error) {
                    console.error('Error fetching category:', error);
                }
            } else {
                setAttributes([]);
            }
        };

        fetchAttributes();
    }, [selectedCategoryId, dispatch]);

    const handleCategoryChange = (e) => {
        const newCategoryId = e.target.value;
        setSelectedCategoryId(newCategoryId); // Correctly update the state
        setAttributes([]);
        dispatch(clearFilters());
        // console.log('Selected category Id:', newCategoryId); // Log the correct value
    };

    const handleFilterChange = (filter) => {
        dispatch(toggleFilter(filter));
        if(onFilterChange){
            onFilterChange(filter);
        }
    };

    return (
        <div>
            <h2>Find your best match</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div>
                <select value={selectedCategoryId} onChange={handleCategoryChange}>
                    <option value="">Choose a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {attributes.length > 0 && (
                <AttributesSelector
                    attributes={attributes}
                    adAttributes={selectedFilters}
                    setAdAttributes={(attr) => handleFilterChange(attr)}
                />
            )}
            <button onClick={() => dispatch(clearFilters())}>Clear filters</button>
        </div>
    );
};

export default SearchSidebar;