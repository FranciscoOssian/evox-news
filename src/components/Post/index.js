import React from 'react';

import Link from 'next/link';
import styles from '../../styles/Home.module.css';

const Post = ({article}) => {
    return (
        <div>
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
        </div>
    );
}

export default Post;