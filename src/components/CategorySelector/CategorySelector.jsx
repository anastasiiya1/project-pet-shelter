import styles from './CategorySelector.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../redux/categories/operations';
import AttributesSelector from './AttributesSelector';

function CategorySelector({ categoryId, setCategoryId, adAttributes, setAdAttributes }) {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const resultAction = await dispatch(getCategories());
                if (getCategories.fulfilled.match(resultAction)) {
                    setCategories(resultAction.payload);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchCategories();
    }, [dispatch]);

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setCategoryId(selectedCategoryId);

        const selectedCategory = categories.find((category) => category.id === parseInt(selectedCategoryId));

        if (selectedCategory) {
            setAttributes(selectedCategory.attribute || []);
            setAdAttributes({
                breed: '',
                age: '',
                size: '',
                gender: '',
                coat_length: '',
                color: '',
                health_condition: '',
                pet_name: ''
            });
        }
    };

    return (
        <div className={styles.formGroup}>
            <label htmlFor="categoryId">Select category</label>
            <select id="categoryId" value={categoryId} onChange={handleCategoryChange} required>
                <option value="">Select a category</option>
                {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))
                ) : (
                    <option disabled>No records found.</option>
                )}
            </select>
            <AttributesSelector attributes={attributes} adAttributes={adAttributes} setAdAttributes={setAdAttributes} />
        </div>
    );
}

export default CategorySelector;
