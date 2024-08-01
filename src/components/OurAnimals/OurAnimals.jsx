import PetCategorie from '../PetCategorie/PetCategorie';
import styles from './OurAnimals.module.css';

function OurAnimals() {
    const cats = 'Cats';
    const dogs = 'Dogs';
    const otherPets = 'Other pets';
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Our Animals</h2>
            <div >
                <PetCategorie>{cats}</PetCategorie>
                <PetCategorie>{dogs}</PetCategorie>
                <PetCategorie>{otherPets}</PetCategorie>
            </div>
            <div className={styles.btnContainer}>
                <button className={styles.allAnimalsBtn}>More animals</button>
            </div>
        </div>
    );
}

export default OurAnimals;
