import React, {useEffect, useState} from 'react'
import styles from '../styles/Modal.module.css'
import firebaseInit from '../firebase/initFirebase'
import { getDatabase, onValue, ref } from 'firebase/database';
import CheckBox from './CheckBox';

const Modal = (props) => {

    const [prices, setPrices] = useState({})

    const [currPrice, setCurrPrice] = useState();
    const [currQuant, setCurrQuant] = useState(1);
    const [currChoice, setCurrChoice] = useState("");
    const [description, setDescription] = useState("");

    const handleButtonClick = (price, choice) => {
        setCurrPrice(price);
        setCurrChoice(` (${choice})`)
    }

    useEffect(async ()=>{
        const app = firebaseInit();
        const db = getDatabase(app);
        const lookup = ref(db, `/Lookup/${props.title}`);
        const promise = new Promise((resolve, reject)=> {
            onValue(lookup, (snapshot)=> {
                const data = snapshot.val();
                resolve(data);
            })
        })
        const [category, type] = await promise.then((data)=> {
            return [data['category'], data['type']];
        })
         
        const menuEntry = ref(db, `/Menu/${type}/${category}/${props.title}`);
        promise = new Promise((resolve, reject)=> {
            onValue(menuEntry, (snapshot)=> {
                const data = snapshot.val();
                resolve(data);
            })
        })
        const res = await promise.then((data)=> {
            return data;
        })
        if (typeof res['price'] === 'object' && res['price'] !== null) {
            setPrices(res['price'])
            setCurrPrice(Math.min(...Object.values(res['price'])));
        } else {
            setPrices(res['price']);
            setCurrPrice(res['price'])
        }

    }, [props.title]);

    const handleText = (event) => {
        setDescription(event.target.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.modaloverlay} id={styles.modaloverlay}></div>
            <div className={styles.modal} id={styles.modal}>
            <button onClick={props.handleClick} className={styles.closebutton} id={styles.closebutton}>X</button>
            <div className={styles.modalguts}>
                <h1 className={styles.title}>{props.title}</h1>
                <p className={styles.description}>{props.description}</p>
                {<CheckBox buttonClick={handleButtonClick} styleName={styles.checkBox}prices={prices}/>}
                <div className={styles.countContainer}>
                    <div className={styles.quantTitle}>Qty:</div>
                    <div className={styles.quantContainer}>
                    <button onClick={() => {currQuant===1? null: setCurrQuant(currQuant - 1)} }className={styles.minus}>-</button> {currQuant} <button onClick={() => {setCurrQuant(currQuant + 1)}}className={styles.plus}>+</button>
                    </div>
                </div>
                <div className={styles.txtTitle}> Notes (150 Characters)&#58; </div>
                <textarea maxLength={150} onChange={handleText} id={styles.notes} name="notes"/>
                <button id={styles.button} onClick={()=>{
                    if (typeof prices === 'object' && prices !== null) {
                        if (!currChoice) {
                            alert("Please choose an option!")
                        } else {
                            props.addToCart(props.title + currChoice, currPrice, currQuant, description)
                        }
                    } else {
                        props.addToCart(props.title, currPrice, currQuant, description)
                    }
                    }} className="buttoninverse">Add to Cart</button>
            </div>
            </div>
        </div>
    )
}

export default Modal
