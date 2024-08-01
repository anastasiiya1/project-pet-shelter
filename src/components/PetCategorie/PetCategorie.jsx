import AnimalInfo from "../AnimalInfo/AnimalInfo"
import styles from './PetCategorie.module.css'
function PetCategorie({children}) {
  return (
    <div>
         <div className={styles.container}>
            <AnimalInfo>Dogs</AnimalInfo>
            <AnimalInfo>Cats</AnimalInfo>
            <AnimalInfo>Other pets</AnimalInfo>
            <div className={styles.btn}>
                <button>More {children}</button>
            </div>
        </div>
    </div>
  )
}

export default PetCategorie