import React, {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import PageHead from '../components/PageHead';
import styles from '../styles/Home.module.css';
import filterUndefined from '../utils/filterUndefined';
import yyyy_mm_dd from '../utils/current_yyyy_mm_dd';

import Post from '../components/Post';

export default function Home( { everything } ) {
  const now = yyyy_mm_dd();

  const [articles, setArticles] = useState(everything);
  const [textSearch, setTextSearch] = useState('');

  const [everythingPage, setEverythingPage] = useState(1);

  async function reloadNewsEverything( search, page ){
    console.log(search, page)
    console.log([])
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
    console.log(response.data)
    console.log(typeof response.data)
    setArticles( response.data );
  }

  async function reloadSearch({target}, page){
    setEverythingPage(1);
    setTextSearch( target.value );
    if(target.value === '') return;
    await reloadNewsEverything(target.value, page)
  }

  function nextEverythingPage(){
    let search;
    if(textSearch === '') search = 'world';
    else search = textSearch;
    reloadNewsEverything( search, everythingPage + 1 );
    setEverythingPage( everythingPage + 1 );
  }

  function backEverythingPage(){
    let search;
    if(textSearch === '') search = 'world';
    else search = textSearch;
    reloadNewsEverything( search, everythingPage - 1 );
    setEverythingPage( everythingPage - 1 );
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
              Evox <div id={styles.evox_title_news}> News </div>
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
          { articles === [] ? (
            <div>
              ops, the ekrjgbrgjbrgbjgjkrgnbkrjfvnrknd of news
            </div>
          ) : (articles.map( article => {
            if(article.urlToImage === null) article.urlToImage = process.env.SAMPLE_IMG;
            console.log(article);
            return (
              <Post article={article} />
            );
          } ) )
          }
        </div>
        
        
        <button
          className={styles.arrowButton}
          id={styles.arrowButtonBack}
          onClick={()=>backEverythingPage()}
        > ← </button>
        <button
          className={styles.arrowButton}
          id={styles.arrowButtonNext}
          onClick={()=>nextEverythingPage()}
        > → </button>
        
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
