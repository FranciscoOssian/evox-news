// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import getNews from '../../services/newsAPI/GET/getNews';

export default async (req, res) => {

  try{
    const { end_point, querys } = req.body;
    const articles = await getNews(end_point, querys);
    res.send(articles);
  }catch(err){
    console.log(err);
    res.send({});
  }
  


}