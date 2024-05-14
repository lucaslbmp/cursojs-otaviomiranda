import {Router} from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

//Nao deveria existir (falha de segurança)
//router.post('/', userController.store);
//router.get('/', loginRequired, userController.index);

router.get('/', loginRequired, userController.show);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;

/*
index -> lista todos usuarios -> GET
store/create -> cria novo usuario -> POST
delete => apaga um usuario -> DELETE
show -> mostra um usuário -> GET
update -> atualiza um usuário -> PATCH ou PUT
*/
