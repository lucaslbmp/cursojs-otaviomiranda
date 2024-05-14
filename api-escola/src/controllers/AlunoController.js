import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController{
  async index(req, res){
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome','sobrenome', 'email', 'peso','altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['url','filename']
      }
    });
    res.json(alunos);
  }

  async store(req, res){
    try{
      const aluno = await Aluno.create(req.body);
      return res.json(aluno);

    } catch(err){
      return res.status(400).json({
        errors: err.errors.map(e => e.message)
      })
    }
  }

  async update(req, res){
    try{
      const {id} = req.params;

      if(!id){
        return res.status(400).json({
          errors: ['Faltando ID']
        })
      }

      const aluno = await Aluno.findByPk(id);

      if(!aluno){
        return res.status(400).json({
          errors: ['Aluno nao existe']
        })
      }

      const alunoAtualizado = await aluno.update(req.body)

      return res.json(alunoAtualizado);

    } catch(err){
      return res.status(400).json({
        errors: err.errors.map(e => e.message)
      })
    }
  }

  async show(req, res){
    try{
      const {id} = req.params;

      if(!id){
        return res.status(400).json({
          errors: ['Faltando ID']
        })
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome','sobrenome', 'email', 'peso','altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url','filename']
        }
      });

      if(!aluno){
        return res.status(400).json({
          errors: ['Aluno nao existe']
        })
      }

      return res.json(aluno);

    } catch(err){
      return res.status(400).json({
        errors: err.errors.map(e => e.message)
      })
    }

  }

  async delete(req, res){
    try{
      const {id} = req.params;

      if(!id){
        return res.status(400).json({
          errors: ['Faltando ID']
        })
      }

      const aluno = await Aluno.findByPk(id);

      if(!aluno){
        return res.status(400).json({
          errors: ['Aluno nao existe']
        })
      }

      await aluno.destroy();

      return res.json({
        apagado: true
      });

    } catch(err){
      return res.status(400).json({
        errors: err.errors.map(e => e.message)
      })
    }
  }
}

export default new AlunoController();
