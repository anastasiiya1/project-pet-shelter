import styles from './CategorySelector.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories, getCategoryById } from '../../redux/categories/operations';
import AttributesSelector from './AttributesSelector';

function CategorySelector({ formData, setFormData }) {
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

    const handleCategoryChange = async (e) => {
        const selectedCategoryId = e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            categoryId: selectedCategoryId
        }));

        try {
            const action = await dispatch(getCategoryById(selectedCategoryId));
            setAttributes(action.payload.attribute || []);
            setFormData((prevState) => ({
                ...prevState,
                adAttributes: []  
            }));
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };

    return (
        <div className={styles.formGroup}>
            <label htmlFor="categoryId">Select category</label>
            <select
                id="categoryId"
                value={formData.categoryId}
                onChange={handleCategoryChange}
                required
            >
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
            <AttributesSelector
                attributes={attributes}
                adAttributes={formData.adAttributes}
                setAdAttributes={(newAttributes) =>
                    setFormData((prevState) => ({
                        ...prevState,
                        adAttributes: newAttributes
                    }))
                }
            />
        </div>
    );
}

export default CategorySelector;