import {useState} from "react"
import styles from '../styles/Convert.module.css';

export default function Convert() {

    const [currency, setCurrency] = useState(0);
    
    const handleInput = (e) => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;

      setCurrency((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue
      }));

      
    };

    return (
      <div className={styles.convertContainer}>
        <div className={styles.convertBox}>
          <form method="POST" >
            <div>
                <label>Euros</label>
                <input type="number" name="euros" onChange={handleInput}/>
            </div>
            <h2>WONS</h2>
            <button className={styles.convertButton} type="submit">Convert</button>
          </form>           
        </div>
      </div>
    );
}
  