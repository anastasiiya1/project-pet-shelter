import { useState } from 'react';
import VolunteersList from '../VolunteersList/VolunteersList';
import SheltersList from '../SheltersList/SheltersList';
import styles from './Partners.module.css';

function Partners() {
    const [view, setView] = useState('volunteers');

    const handleViewChange = (newView) => {
        setView(newView);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Partners</h2>
            <div className={styles.buttonGroup}>
                <button
                    className={`${styles.button} ${view === 'volunteers' ? styles.active : ''}`}
                    onClick={() => handleViewChange('volunteers')}
                >
                    Volunteers
                </button>
                <button
                    className={`${styles.button} ${view === 'shelters' ? styles.active : ''}`}
                    onClick={() => handleViewChange('shelters')}
                >
                    Shelters
                </button>
            </div>
            <div className={styles.content}>
                {view === 'volunteers' && <VolunteersList />}
                {view === 'shelters' && <SheltersList />}
            </div>
            <h3 className={styles.header}>You have a shelter and want to cooperate? Join us!</h3>
            <button className={styles.registerBtn}>Register your shelter</button>
        </div>
    );
}

export default Partners;
