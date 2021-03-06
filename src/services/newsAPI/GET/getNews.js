import { baseUrl } from '../configs.json';
import axios from 'axios'

import filterUndefined from '../../../utils/filterUndefined';
import queryToUrl from '../../../utils/queryToUrl';

const getNews = async (endPoint, query) => {
    
    query = filterUndefined(query);
    let queryFinal = queryToUrl(query);
    queryFinal = encodeURI(queryFinal);

    const url = `${baseUrl}/${endPoint}?${queryFinal}&apiKey=${process.env.API_TOKEN}`;


    let response;

    try{
        response = await axios.get(url);
    }catch(err){
        console.log("erro em news: ", err);
        return response = [];
    }

    console.log(response.data.articles)

     

    return response.data.articles;
}

export default getNews;