import styles from './CategorySelector.module.css';

const categories = [
    { id: 'dogs', label: 'Dogs' },
    { id: 'cats', label: 'Cats' },
    { id: 'birds', label: 'Birds' },
    { id: 'fish', label: 'Fish' },
    { id: 'reptiles', label: 'Reptiles' },
    { id: 'others', label: 'Other Animals' }
];

const breeds = {
    dogs: ['Labrador', 'Bulldog', 'Poodle', 'Beagle'],
    cats: ['Persian', 'Maine Coon', 'Siamese', 'Bengal'],
    birds: ['Parrot', 'Canary', 'Finch'],
    fish: ['Goldfish', 'Betta', 'Guppy'],
    reptiles: ['Lizard', 'Snake', 'Turtle']
};

const colors = ['Black', 'White', 'Brown', 'Gray', 'Golden'];
const ageRanges = ['Under 1 year', '1-3 years', '3-5 years', 'Over 5 years'];

function CategorySelector({ categoryId, setCategoryId, adAttributes, setAdAttributes }) {
    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value);
        setAdAttributes({
            breed: '',
            color: '',
            age: '',
            size: '',
            gender: ''
        });
    };

    const selectedCategory = breeds[categoryId] || [];
	const sizes = ['Small', 'Medium', 'Large'];

    const handleSizeChange = (e) => {
        const value = parseInt(e.target.value, 10);
        let size = 'Small';
        if (value === 2) {
            size = 'Medium';
        } else if (value === 3) {
            size = 'Large';
        }
        setAdAttributes({ ...adAttributes, size });
    };
    return (
        <div className={styles.formGroup}>
            <label htmlFor="categoryId">Select category</label>
            <select id="categoryId" value={categoryId} onChange={handleCategoryChange} required>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.label}
                    </option>
                ))}
            </select>

            {categoryId && (
                <>
                    <label htmlFor="breed">Choose breed</label>
                    <select
                        id="breed"
                        value={adAttributes.breed}
                        onChange={(e) => setAdAttributes({ ...adAttributes, breed: e.target.value })}
                    >
                        <option value="">Select breed</option>
                        {selectedCategory.map((breed) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                    <div className={styles.formGroup}>
                        <label>Choose color</label>
                        {colors.map((color) => (
                            <div key={color} className={styles.radioGroup}>
                                <input
                                    type="radio"
                                    id={`color-${color}`}
                                    name="color"
                                    value={color}
                                    checked={adAttributes.color === color}
                                    onChange={(e) => setAdAttributes({ ...adAttributes, color: e.target.value })}
                                />
                                <label htmlFor={`color-${color}`}>{color}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Choose age</label>
                        {ageRanges.map((range) => (
                            <div key={range} className={styles.radioGroup}>
                                <input
                                    type="radio"
                                    id={`age-${range}`}
                                    name="age"
                                    value={range}
                                    checked={adAttributes.age === range}
                                    onChange={(e) => setAdAttributes({ ...adAttributes, age: e.target.value })}
                                />
                                <label htmlFor={`age-${range}`}>{range}</label>
                            </div>
                        ))}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Size</label>
                        <div className={styles.sizeSlider}>
                            <input
                                type="range"
                                className={styles.rangeInput}
                                min="1"
                                max="3"
                                step="1"
                                value={sizes.indexOf(adAttributes.size) + 1}
                                onChange={handleSizeChange}
                            />
                        </div>
                        <div className={styles.sizeLabels}>
                            <span className={adAttributes.size === 'Small' ? styles.active : ''}></span>
                            <span className={adAttributes.size === 'Medium' ? styles.active : ''}></span>
                            <span className={adAttributes.size === 'Large' ? styles.active : ''}></span>
                        </div>
                        <p>{adAttributes.size}</p>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="gender">Choose gender</label>
                        <select
                            id="gender"
                            value={adAttributes.gender}
                            onChange={(e) => setAdAttributes({ ...adAttributes, gender: e.target.value })}
                        >
                            <option value="">Select gender:</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </>
            )}
        </div>
    );
}

export default CategorySelector;
