import PropTypes from 'prop-types';
import styles from './AdvList.module.css';

function AdvItem({ ad, onDelete }) {
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = 'https://via.placeholder.com/150'; // Зображення-заповнювач при помилці завантаження
    };

    // Формуємо URL для зображення
    const imageUrl = ad.thumbnail 
        ? `${import.meta.env.VITE_API_URL}/api/v1/photos/${ad.thumbnail.filename}`
        : null;

    return (
        <li className={styles.advertisementItem}>
            {imageUrl ? (
                <div className={styles.imageContainer}>
                    <img 
                        src={imageUrl} 
                        alt={ad.title} 
                        className={styles.adImage}
                        onError={handleImageError}
                    />
                </div>
            ) : (
                <p>No image available</p>
            )}
            <h3>{ad.title}</h3>
            <p>{ad.description}</p>
            <button onClick={() => onDelete(ad.id)} className={styles.deleteButton}>
                Delete
            </button>
        </li>
    );
}

AdvItem.propTypes = {
    ad: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        thumbnail: PropTypes.shape({
            filename: PropTypes.string,
        }),
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default AdvItem;