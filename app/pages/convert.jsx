import {useEffect, useState} from "react"
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


    function submitForm() {
      console.log("tyoto")
      useEffect(() => {
        fetch('/currency/')
          .then(res => res.json())
          .then(data => {
            console.log(data) 
            setMessage(data.message);
            setLoading(false);
          })
      }, [])
    }

    return (
      <div className={styles.convertContainer}>
        <div className={styles.convertBox}>
          <form method="POST" >
            <div>
                <label>Euros</label>
                <input type="number" name="euros" onChange={handleInput}/>
            </div>
            <h2>WONS</h2>
            <button className={styles.convertButton} onChange={submitForm}>Convert</button>
          </form>           
        </div>
      </div>
    );
}
  