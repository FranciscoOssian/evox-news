// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors';
import NewsApi from 'newsapi';
import filterUndefined from '../../utils/filterUndefined';


const cors = Cors({
    methods: ['GET', 'HEAD'],
})

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            
            return resolve(result)
        })
    })
}

const newsApi = new NewsApi(process.env.API_TOKEN);
export default async (req, res) => {
    
    await runMiddleware(req, res, cors);
    try{
        const querys = filterUndefined(req.body.params.querys);
        const response = await newsApi.v2.everything(querys)
        const articles = response.articles;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send( articles );

    }catch(err){
        console.log(err);
        res.send([]);
    }
}