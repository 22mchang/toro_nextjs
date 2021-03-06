import {Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'next/image'
import styles from '../styles/Navigbar.module.css'

const OrderNavBar = (props) => {
    return (
      <>
         <Navbar className={styles.test} sticky="top" collapseOnSelect expand="lg" bg="white" variant="light">
            <Navbar.Toggle className={styles.endMargin} aria-controls="responsive-navbar-nav" />
            

           <Navbar.Brand id={styles.logo} className={styles.endMargin} href="/">
    
            <Image
              src='/assets/toro-logo.png' 
              width="120%" 
              height="80%" 
              alt="toro" 
              objectFit="contain"
              />
           </Navbar.Brand>

            <div className={styles.iconContainer}>
            <img onClick={props.toggle} className={styles.cart} src="/assets/cart.svg" alt="cart"/>
            <div className={styles.numItems}>{props.numItems}</div>
            </div>
           <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className={styles.routes}>
                <Nav.Link id={styles.font} href="/">Welcome</Nav.Link>
                <Nav.Link id={styles.font} href="/order">Order</Nav.Link>
                <Nav.Link id={styles.font} href="/menu">Menu</Nav.Link>
                <Nav.Link id={styles.font} href="/reviews">Reviews</Nav.Link>
                <Nav.Link id={styles.font} href="https://www.messenger.com/login.php?next=https%3A%2F%2Fwww.messenger.com%2Ft%2F171694852715%2F%3Fmessaging_source%3Dsource%253Apages%253Amessage_shortlink">Contact</Nav.Link>
            </Nav>
            </Navbar.Collapse>
          
         </Navbar>
     </>
    )
}

export default OrderNavBar