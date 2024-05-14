import dotenv from 'dotenv';
dotenv.config();
import './database';
import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import {resolve}  from 'path'

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import alunoRoutes from './routes/alunoRoutes';
import fotoRoutes from './routes/fotoRoutes';

const whiteList = [
  'http://localhost:3001',
  'http://localhost:3000',
  'http://34.39.129.80'
];

const corsOption = {
  origin: function(origin, callback){
    if(whiteList.indexOf(origin) !== -1 || !origin){
      callback(null, true);
    } else {
      callback(new Error('Nao permitido pelo CORS'));
    }
  }
}

class App {
  constructor(){
    this.app = express();
    console.log(this.app.use)
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')))
  }

  routes(){
    this.app.use(cors(corsOption));
    this.app.use(helmet())
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/fotos/', fotoRoutes);
  }
}

export default new App().app;
