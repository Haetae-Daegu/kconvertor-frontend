import SocialLinks from '@/components/SocialLinks';
import styles from '../styles/Main.module.css';

import Link from 'next/link'
import Convert from './currency/convert';
import CurrencyChart from './chart/chart';


export default function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.titlePanel}>
        <h1 className={styles.title}>Korean Convertor</h1>
        <Link href="auth/login">Login</Link>
        <SocialLinks />
        <Convert/>
        <CurrencyChart/>
      </div>
    </div>
  );
}