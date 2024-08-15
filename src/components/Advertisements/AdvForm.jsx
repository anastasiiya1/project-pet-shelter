import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewAdvertisement } from '../../redux/advertisements/operations';
import PhotoUploader from './PhotoUploader/PhotoUploader';
import CategorySelector from '../CategorySelector/CategorySelector';
import styles from './AdvForm.module.css';

function AdvForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [priceOption, setPriceOption] = useState('');
    const [photoFiles, setPhotoFiles] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [adAttributes, setAdAttributes] = useState({
        breed: '',
        color: '',
        age: '',
        size: '',
        gender: ''
    });
    const [authorId] = useState(1);

    const handlePhotosOnChange = (files) => {
        setPhotoFiles(files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalPrice = priceOption === 'enterPrice' && !isNaN(parseFloat(price)) ? parseFloat(price) : 0;
        if (isNaN(finalPrice)) {
            console.error("Invalid price value");
            return;
        }

        const formData = new FormData();
        formData.append('authorId', authorId);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', finalPrice);
        formData.append('adAttributes', JSON.stringify(adAttributes));
        formData.append('categoryId', Number(categoryId));

        photoFiles.forEach((file, index) => {
            formData.append('photoFiles', file);
            if (index === 0) {
                formData.append('thumbnail', file);
            }
        });

        dispatch(addNewAdvertisement(formData));
        setTitle('');
        setDescription('');
        setPrice('');
        setPriceOption('');
        setPhotoFiles([]);
        setAdAttributes({
            breed: '',
            color: '',
            age: '',
            size: '',
            gender: ''
        });
        setCategoryId('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.advertisementForm}>
            <h2>Add New Advertisement</h2>
            <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <h4>Set price</h4>
                <div className={styles.radioGroup}>
                    <input
                        type="radio"
                        id="freePrice"
                        name="priceOption"
                        value="freePrice"
                        checked={priceOption === 'freePrice'}
                        onChange={(e) => setPriceOption(e.target.value)}
                    />
                    <label htmlFor="freePrice">For free</label>

                    <input
                        type="radio"
                        id="enterPrice"
                        name="priceOption"
                        value="enterPrice"
                        checked={priceOption === 'enterPrice'}
                        onChange={(e) => setPriceOption(e.target.value)}
                    />
                    <label htmlFor="enterPrice">Enter your price</label>
                </div>

                {priceOption === 'enterPrice' && (
                    <div className={styles.priceInputGroup}>
                        <label htmlFor="price">Enter your price</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                )}
            </div>
            <div className={styles.formGroup}>
                <div className={styles.formGroup}>
                    <PhotoUploader onPhotosChange={handlePhotosOnChange} />
                </div>

                <div className={styles.formGroup}>
                    <CategorySelector
                        categoryId={categoryId}
                        setCategoryId={setCategoryId}
                        adAttributes={adAttributes}
                        setAdAttributes={setAdAttributes}
                    />
                </div>
            </div>

            <button type="submit" className={styles.submitButton}>
                Add Advertisement
            </button>
        </form>
    );
}

export default AdvForm;
