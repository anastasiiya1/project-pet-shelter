import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewAdvertisement } from '../../redux/advertisements/operations';
import styles from './AdvForm.module.css'

function AdvForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [photoFiles, setPhotoFiles] = useState([]);
    const [adAttributes, setAdAttributes] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [authorId] = useState(1); // Replace with actual author ID if necessary

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addNewAdvertisement({
            authorId,
            title,
            description,
            price: parseFloat(price),
            photoFiles,
            adAttributes,
            categoryId
        }));
        setTitle('');
        setDescription('');
        setPrice('');
        setPhotoFiles([]);
        setAdAttributes('');
        setCategoryId('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.advertisementForm}>
            <h2>Add New Advertisement</h2>
            <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
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
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="photoFiles">Photo Files (URLs)</label>
                <input
                    type="text"
                    id="photoFiles"
                    value={photoFiles}
                    onChange={(e) => setPhotoFiles(e.target.value.split(','))}
                    placeholder="Comma-separated URLs"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="adAttributes">Attributes</label>
                <input
                    type="text"
                    id="adAttributes"
                    value={adAttributes}
                    onChange={(e) => setAdAttributes(e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="categoryId">Category ID</label>
                <input
                    type="number"
                    id="categoryId"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className={styles.submitButton}>
                Add Advertisement
            </button>
        </form>
    );
}

export default AdvForm;