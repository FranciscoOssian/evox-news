import { baseUrl } from '../configs.json';
import axios from 'axios'

import filterUndefined from '../../../utils/filterUndefined';
import queryToUrl from '../../../utils/queryToUrl';

const getSource = async (query) => {

    query = filterUndefined(query);
    let queryFinal = queryToUrl(query);
    queryFinal = encodeURI(queryFinal);

    const url = `${baseUrl}/sources?${queryFinal}&apiKey=${process.env.API_TOKEN}`;

    try{
        response = await axios.get(url);
    }catch(err){
        console.log(err);
        return response = [];
    }

    return response.data.articles;
}

export default getSource;