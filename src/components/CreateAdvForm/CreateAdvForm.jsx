import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewAdvertisement } from '../../redux/advertisements/operations.js';
import CategorySelector from '../CategorySelector/CategorySelector.jsx';
import styles from './CreateAdvForm.module.css';

const CreateAdvForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        categoryId: '',
        photoFiles: [],
        adAttributes: [],
        authorId: 1
    });
    const [isFree, setIsFree] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            photoFiles: Array.from(e.target.files)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('title', formData.title);
        fd.append('description', formData.description);
        fd.append('price', formData.price);
        fd.append('categoryId', formData.categoryId);
        fd.append('authorId', formData.authorId);

        formData.photoFiles.forEach((file) => {
            fd.append('photoFiles', file);
        });

        if (formData.adAttributes.length > 0) {
            fd.append('adAttributes', JSON.stringify(formData.adAttributes));
        } else {
            console.log('adAttributes is empty');
        }

        dispatch(addNewAdvertisement(fd))
            .then((response) => {
                if (response.status === 200) {
                    setIsSubmitted(true);
                    setIsVisible(false);
                    setError('');
                } else if (response.status === 400) {
                    setError('Error: Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('An unexpected error occurred. Please try again later.');
            });
    };

    return (
        <div>
            {isVisible && (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Advertisement title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Price</label>
                        <div className={styles.radioGroup}>
                            <input
                                type="radio"
                                name="priceType"
                                value="0"
                                checked={isFree}
                                onChange={() => {
                                    setIsFree(true);
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        price: '0.00'
                                    }));
                                }}
                            />{' '}
                            Free
                            <input
                                type="radio"
                                name="priceType"
                                value="paid"
                                checked={!isFree}
                                onChange={() => setIsFree(false)}
                            />{' '}
                            Paid
                            {!isFree && (
                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            )}
                        </div>
                    </div>
                    <CategorySelector formData={formData} setFormData={setFormData} />
                    <div className={styles.uploadGroup}>
                        <label>Upload photos:</label>
                        <input type="file" multiple onChange={handlePhotoChange} />
                    </div>
                    <button className={styles.button} type="submit">
                        Create Advertisement
                    </button>
                </form>
            )}
            {isSubmitted && !isVisible && (
                <div className={styles.successMessage}>
                    Congratulations! Your advertisement was successfully created.
                </div>
            )}
            {error && (
                <div className={styles.errorMessage}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default CreateAdvForm;