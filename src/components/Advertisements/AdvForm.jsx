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
        age: '',
        size: '',
        gender: '',
        coat_length: '',
        color: '',
        health_condition: '',
        pet_name: ''
    });
    const [authorId] = useState(1);

    const handlePhotosOnChange = (files) => {
        setPhotoFiles(files);
    };

    const handlePriceChange = (e) => {
        let value = e.target.value;
        if (value === '') {
            setPrice('');
            return;
        }
        value = parseFloat(value).toFixed(2);
        setPrice(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Перевірка на наявність фото
        if (photoFiles.length === 0) {
            console.error('No photo files selected');
            return;
        }
    
        // Формування основних даних для оголошення
        const finalPrice = priceOption === 'enterPrice' && !isNaN(parseFloat(price)) ? parseFloat(price).toFixed(2) : 0;
        if (isNaN(finalPrice)) {
            console.error('Invalid price value');
            return;
        }
    
        // Формування даних для оголошення
        const attributesObject = {
            breed: adAttributes.breed,
            age: adAttributes.age,
            size: adAttributes.size,
            gender: adAttributes.gender,
            coat_length: adAttributes.coat_length,
            color: adAttributes.color,
            health_condition: adAttributes.health_condition,
            pet_name: adAttributes.pet_name
        };
    
        const formData = {
            title,
            description,
            price: finalPrice,
            authorId,
            categoryId: Number(categoryId),
            photoFiles: [], // placeholder for photo files
            adAttributes: JSON.stringify(attributesObject)
        };
    
        // Додаємо фото файли як Base64 строки в photoFiles
        for (const file of photoFiles) {
            const base64String = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
            formData.photoFiles.push(base64String);
        }
    
        try {
            // Відправка основного оголошення на сервер
            await dispatch(addNewAdvertisement(formData)).unwrap();
    
            // Очищення форми
            setTitle('');
            setDescription('');
            setPrice('');
            setPriceOption('');
            setPhotoFiles([]);
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
            setCategoryId('');
    
        } catch (err) {
            console.log('Failed to create advertisement:', err);
        }
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
                            onChange={handlePriceChange}
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>
                )}
            </div>

            <div className={styles.formGroup}>
                <CategorySelector
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                    adAttributes={adAttributes}
                    setAdAttributes={setAdAttributes}
                />
            </div>
            <PhotoUploader onPhotosChange={handlePhotosOnChange} />

            <button type="submit" className={styles.submitButton}>
                Add Advertisement
            </button>
        </form>
    );
}

export default AdvForm;
