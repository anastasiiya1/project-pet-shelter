import { NavLink } from "react-router-dom";
import SocialLinks from "../SocialLinks/SocialLinks";
import clsx from 'clsx';
import styles from './Footer.module.css';

const style = ({ isActive }) => clsx(styles.link, { [styles.active]: isActive });

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className={styles.footer}>
            <h2>Contacts</h2>
            <button onClick={scrollToTop} className={styles.scrollToTopBtn}>Scroll to top</button>
            <nav className={styles.nav}>
                <NavLink to="/" className={styles.logo}>
                    Logo
                </NavLink>
                <a href="tel:+380446756528" className={styles.phone}>
                    +380446756528
                </a>
            </nav>
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
            <div className={styles.socialLinks}>
                <SocialLinks />
            </div>
            <div>
                <p>Copyright 2024</p>
                <a href="#">Privacy policy</a>
                <p>Created with love by Team @233</p>
            </div>
        </div>
    );
}

export default Footer;