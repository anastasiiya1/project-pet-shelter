import AnimalCard from '../AnimalCard/AnimalCard';
import styles from './AnimalsDemo.module.css';

function AnimalsDemo() {
    return (
        <div className={styles.container}>
            <AnimalCard>Dogs</AnimalCard>
            <AnimalCard>Cats</AnimalCard>
            <AnimalCard>Other pets</AnimalCard>
            <div className={styles.btn}>
                <button>All animals</button>
            </div>
        </div>
    );
}

export default AnimalsDemo;
