import React from 'react';

import Home from '../index';

import getEverything from '../../services/newsAPI/GET/getEverything';

export default function Search(props){
  return <Home {...props} />
}

export async function getServerSideProps(context) {
  const query = context.params.query;
  if(query === undefined) search = "world"
  const response = await getEverything({
    qInTitle: query
  });
  return {
    props: {
        response,
    }, // will be passed to the page component as props
  }
}