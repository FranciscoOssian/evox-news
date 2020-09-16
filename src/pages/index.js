import React, {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import PageHead from '../components/PageHead';
import styles from '../styles/Home.module.css';
import filterUndefined from '../utils/filterUndefined';
import yyyy_mm_dd from '../utils/current_yyyy_mm_dd';

export default function Home( { everything } ) {
  const now = yyyy_mm_dd();

  const [articles, setArticles] = useState(everything);
  const [textSearch, setTextSearch] = useState('');

  const [everythingPage, setEverythingPage] = useState(1);

  async function reloadNewsEverything( search, page ){
    console.log(search, page)
    const url = (process.env.EVOX_NEWS_URL + '/api/everything').replace('undefined', '')
    const response = await axios.post(url, {
      params: {
        querys:{
          q:search,
          page: page,
          to:now,
          from:now,
        }
      }
    })
    setArticles( response.data );
  }

  async function reloadSearch({target}, page){
    setTextSearch( target.value );
    if(target.value === '') return;
    await reloadNewsEverything(target.value, page)
  }

  function nextEverythingPage(){
    setEverythingPage( everythingPage + 1 );
    reloadNewsEverything( textSearch, everythingPage );
  }

  function backEverythingPage(){
    setEverythingPage( everythingPage - 1 );
    reloadNewsEverything( textSearch, everythingPage );
  }

  return (
    <div className={styles.container}>

      <Head>
        <title>Evox News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="header">
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
              onChange={(e)=>reloadSearch(e, everythingPage)}
              placeholder="search news"
              value={textSearch}
            />
          </div>
        </div>
        

        <div className={styles.grid}>
          {
            articles.map( article => (
                <Link href="/new"
                >
                  <div className={styles.card}>
                    <img src={article.urlToImage} alt="" ></img>
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
        
        
        <button
          onClick={()=>backEverythingPage()}
        >back page</button>
        <button
          onClick={()=>nextEverythingPage()}
        >next page</button>
        
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {

  const now = yyyy_mm_dd();
  
  const url = (process.env.EVOX_NEWS_URL + '/api/everything').replace('undefined', '');
  const response = await axios.post(url, {
    params:{
      querys:{
        q:"world",
        from: now,
        to: now,
      }
    }
  })
  const everythingArticles = response.data;

  return {
    props: {
        everything: everythingArticles,
    },
  }
}
