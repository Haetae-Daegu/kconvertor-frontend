import styles from '../styles/Main.module.css';
import Convert from './currency/convert';

export default function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.titlePanel}>
        <h1 className={styles.title}>Korean Convertor</h1>
        <Convert/>
      </div>
    </div>
  );
}