import React, {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import getEverything from '../services/newsAPI/GET/getEverything';
import PageHead from '../components/PageHead';
import styles from '../styles/Home.module.css';
import useSwr from 'swr';

export default function Home({response}) {

  const [articles, setArticles] = useState(response);
  const [textSearch, setTextSearch] = useState('');

  async function reloadNews({ target }){
    const textToSearch = target.value;
    let i;
    
    const data = await axios.get('https://evox-news.vercel.app/api/news', {
      end_point: "everything",
      querys:{
        q:"bitcoin"
      }
    })

    console.log("articles -> ", data);

    setArticles( data.data )

  }

  return (
    <div className={styles.container}>
      
      <Head>
        <title>Evox News huuh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PageHead/>
        <h1 className={styles.title}>
          Evox News
        </h1>
        <p className={styles.description}>
          Your news site
        </p>
        <div>
          🔍
          <input
            onChange={(e)=>reloadNews(e)}
            placeholder="search news"
            value={textSearch}
          />
        </div>
        <div className={styles.grid}>
          {articles.map( article => (
            <Link href="/new"
              id={article.url}
            >
              <div className={styles.card}>
                <img src={article.urlToImage} alt=""></img>
                <h3>{article.title.substring(0, 50)}</h3>
                <p>{article.description.substring(0, 100)}</p>
              </div>
            </Link>
          ) )}
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    
    </div>
  )
}

export async function getServerSideProps(context) {
  let search = 'world';
  const response = await getEverything({
      q: search
  });
  return {
    props: {
        response,
    }, // will be passed to the page component as props
  }
}
