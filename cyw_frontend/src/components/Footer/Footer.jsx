
import styles from './Footer.module.scss'


function Footer() {
    return (
        <footer className={styles.footer}>
            <ul>
                <li>ITEMSDA</li>
                <li>ITEMSDA</li>
                <li>ITEMSDA</li>
                <li>ITEMSDA</li>
                <li>ITEMSDA</li>
            </ul>
            <p>
                &copy; {new Date().getFullYear()} 
                Collect Your Wheels. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;
