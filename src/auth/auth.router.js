/**
 * Define el router de auth y asocia a cada una de las rutas un 
 * controller
 */
import express from 'express';
// importo el controller para gestionar el login
import { loginJWTController, registerUserController, validateUserController } from './auth.controller.js'

const router = express.Router();

router.route('/login')
    .post(loginJWTController); // es un post porque creo un token para esa sesión

router.route('/register')
    .post(registerUserController); // es un post porque creo un usuario

router.route('/validate')
    .get(validateUserController); // es un get porque me dice si es válido o no

export default router;