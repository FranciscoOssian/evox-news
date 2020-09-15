import React, {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import getEverything from '../services/newsAPI/GET/getEverything';
import PageHead from '../components/PageHead';
import styles from '../styles/Home.module.css';

export default function Home({response}) {

  const [articles, setArticles] = useState(response);
  const [textSearch, setTextSearch] = useState('');

  async function reloadNews({ target }){
    setTextSearch( target.value );
    const response = await axios.post("http://localhost:3000/api/news", {
      params: {
        end_point:"everything",
        querys:{
          q:target.value
        }
      }
    })
    setArticles( response.data );
  }

  return (
    <div className={styles.container}>

      <Head>
        <title>Evox News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>


        <div className={styles.Evox}>
          <h1 className={styles.title}>
            Evox News
          </h1>
          <p className={styles.description}>
            Your news search site
          </p>
        </div>
        
        
        <div id={styles.search} >
          <input
            className={styles.text_search}
            onChange={(e)=>reloadNews(e)}
            placeholder="search news"
            value={textSearch}
          />
        </div>

        <div className={styles.grid}>
          {
            articles.map( article => (
                <Link href="/new"
                  id={article.url}
                >
                  <div className={styles.card}>
                    <img src={article.urlToImage} alt="" width="500" ></img>
                    <div className={styles.card_text}>
                      <h3>{article.title === null ? '' : article.title.substring(0, 100) }</h3>
                      <p>{article.description === null ? '' : article.description.substring(0, 50)}</p>
                    </div>
                  </div>
                </Link>
              )
            )
          }
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  const a = "2018-07-24T12:00:13Z"
  let search = 'notícia';
  const response = await getEverything({
      q: search,
      publishedAt: a
  });
  return {
    props: {
        response,
    },
  }
}
