import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Navigation.module.css';

const style = ({ isActive }) => clsx(styles.link, { [styles.active]: isActive });

function Navigation() {
    return (
        <nav className={styles.nav}>
            <NavLink to="/" className={style}>
                Logo
            </NavLink>
            <div className={styles.navLinks}>
            <NavLink to="/about-us" className={style}>
                About us
            </NavLink>
            <NavLink to="/animals" className={style}>
                Our animals
            </NavLink>
            <NavLink to="/volunteering" className={style}>
                Partners
            </NavLink>
            <NavLink to="/contacts" className={style}>
                Contact
            </NavLink>
            </div>
             <div className={styles.login}>
            <NavLink to="/sign-in" className={style}>
                Sign In
            </NavLink>
            <NavLink to="/donations" className={style}>
                Donations
            </NavLink>
            </div>
            
        </nav>
    );
}

export default Navigation;
