import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Convertisseur de monnaie</h1>
        <p className={styles.subtitle}>Korean Convertor</p>
      </div>
    </div>
  );
}
