import styles from '../styles/Home.module.css';
import Convert from './convert';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.titlePanel}>
        <h1 className={styles.title}>Convertisseur de monnaie</h1>
        <p className={styles.subtitle}>Korean Convertor</p>
        {/* <Convert/> */}
      </div>
    </div>
  );
}
