import { baseUrl } from '../configs.json';
import axios from 'axios'

import filterUndefined from '../../../utils/filterUndefined';
import queryToUrl from '../../../utils/queryToUrl';

const getEverything = async (endPoint, query) => {

    query = filterUndefined(query);
    let queryFinal = queryToUrl(query);
    queryFinal = encodeURI(queryFinal);

    const url = `${baseUrl}/${endPoint}?${queryFinal}&apiKey=${process.env.API_TOKEN}`;

    console.log(url)

    let response;

    try{
        response = await axios.get(url);
    }catch(err){
        console.log(err);
        return response = [];
    }

    return response.data.articles
}

export default getEverything;