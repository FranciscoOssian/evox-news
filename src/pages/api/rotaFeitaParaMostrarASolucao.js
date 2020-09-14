// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors';
import getNews from '../../services/newsAPI/GET/getNews';

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

export default async (req, res) => {

  await runMiddleware(req, res, cors);

  try{

    const { end_point, querys } = req.body;

    const articles = await getNews("everything", { q:"bitcoin" });

    res.status(200).send( articles );

  }catch(err){

    res.send({error:"error in api /news"});
    
  }
  
}