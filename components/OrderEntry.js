import styles from '../styles/OrderEntry.module.css'

const orderEntry = (name, price, desc, onclick) => {
    if (typeof price === 'object' && price !== null) {
        price = Math.min(...Object.values(price))
    } 
    if (typeof desc === 'object' && desc != null) {
        const temp = `In: ${desc['in']}`
        if ('out' in desc) {
            temp += ` | Out: ${desc['out']}`
        }
        desc = temp;
    }

    
    if (typeof price === 'object' && price !== null) {
        console.log(price);
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })
 

    return (
        <div>
            <div onClick={()=> {onclick(name, desc, price)}} className={styles.entry}>
                    <div className={styles.entryname}>
                        {name}
                    </div>
                    <div className={styles.entrydesc}>
                        {desc}
                    </div>
                    <div className={styles.price}>
                        {formatter.format(price)}
                    </div>
                </div>
        </div>
    )
}

export default orderEntry
