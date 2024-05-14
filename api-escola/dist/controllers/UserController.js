"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController{
  async store(req, res){
    try{
      //console.log(req);
      const novoUser = await _User2.default.create(req.body);
      const {id, nome, email} = novoUser;
      return res.json({id, nome, email})
    } catch(err) {
      return res.status(400).json({
        errors: err.errors.map(e => e.message),
      })
    }

  }

  // Index
  async index (req, res)  {
    try{
      const users = await _User2.default.findAll({attributes: ['id', 'nome', 'email']});
      return res.json(users);
    } catch(err){
      console.log(err);
      return res.json(null);
    }
  }

  // Show
  async show (req, res)  {
    try{
      const user = await _User2.default.findByPk(req.userId);
      const {id, nome, email} = user;
      return res.json({id, nome, email});
    } catch(err){
      console.log(err);
      return res.json(null);
    }
  }

  // Update
  async update (req, res)  {
    try{
      if(!req.userId){
        return res.status(400).json({
          errors: ['ID invalido']
        })
      }

      const user = await _User2.default.findByPk(req.userId);

      if(!user){
        return res.status(400).json({
          errors: ['Usuario nao existe']
        })
      }

      const novosDados = await user.update(req.body);
      const {id, nome, email} = novosDados;

      return res.json({id, nome, email});
    } catch(err){
      return res.status(400).json({
        errors: err.errors.map(e => e.message),
      })
    }
  }

  // Delete
  async delete (req, res)  {
    try{
      if(!req.userId){
        return res.status(400).json({
          errors: ['ID invalido']
        })
      }

      const user = await _User2.default.findByPk(req.userId);

      if(!user){
        return res.status(400).json({
          errors: ['Usuario nao existe']
        })
      }

      await user.destroy();

      return res.json(user);
    } catch(err){
      return res.status(400).json({
        errors: err.errors.map(e => e.message),
      })
    }
  }
}

exports. default = new UserController();
