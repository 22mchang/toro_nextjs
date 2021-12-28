import Head from 'next/head'
import FavoriteStrip from '../components/FavoriteStrip'
import Navigbar from '../components/Navigbar'
import PhotoLogoStrip from '../components/PhotoLogoStrip'
import PhotoStrip from '../components/PhotoStrip'
import ReviewStrip from '../components/ReviewStrip'
import styles from '../styles/home.module.css'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigbar/>
      <PhotoLogoStrip />
      <p id={styles.open}>We are open for take-out, delivery, and socially-distanced dining! </p>
      <FavoriteStrip />
      <PhotoStrip />
      <ReviewStrip />
      <Footer />
      
    </>
  )
}
