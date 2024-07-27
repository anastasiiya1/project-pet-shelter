import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Navigation.module.css';

const style = ({ isActive }) => clsx(styles.link, { [styles.active]: isActive });

function Navigation() {
    return (
        <nav className={styles.nav}>
            <NavLink to="/" className={style}>
                Home
            </NavLink>
            <NavLink to="/search" className={style}>
                Search
            </NavLink>
            <NavLink to="/categories" className={style}>
                Categories
            </NavLink>
            <NavLink to="/news" className={style}>
                News
            </NavLink>
            <NavLink to="/about-us" className={style}>
                About us
            </NavLink>
            <NavLink to="/donations" className={style}>
                Help/Donations
            </NavLink>
            <NavLink to="/sign-in" className={style}>
                Sign In
            </NavLink>
            <NavLink to="/registration" className={style}>
                Create account
            </NavLink>
        </nav>
    );
}

export default Navigation;
