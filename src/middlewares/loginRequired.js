import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const {authorization} = req.headers;

  if(!authorization){
    return res.status(401).json({
      errors: ['Login required']
    })
  }

  const [, token] = authorization.split(' ');

  try{
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const {id, email} = dados;

    const user = await User.findOne({
      where: {id, email}
    })

    if(!user){
      return res.status(401).json({
        errors: ['Usuário inválido']
      })
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      errors: ['Token expirado ou invalido']
    })
  }
}

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsdWNhc3NldDEwQG1zbi5jb20iLCJpYXQiOjE3MTQ3ODA3ODcsImV4cCI6MTcxNTM4NTU4N30.3YPOw_I9XN65_FugclzwhTt_PF57kAnKGc-PUYLYITw
