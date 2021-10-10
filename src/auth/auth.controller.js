// importo del modelo la función que quiero utilizar para obtener la
// información del usuario o registrar al usuario
import { getUserInfoById, getUserInfoByIdAndPassword, registerUser, updateUserMailVerification } from "../user/user.model.js";
// MODELO de AUTH
import { registerToken, validateToken } from "./auth.model.js";
// importo la librería JWT para generar un token JWT
import jwt from 'jsonwebtoken';
// importo el secret para cifrar el JWT
import { secret } from './auth.secret.js';
// importo la utilidad para la codificación de la password
import { encodePassword, generateRandomEmailToken } from './auth.utils.js';

import { sendMail } from '../adapters/mail.js'; // importo mi adaptador de emails 

/**
 * Este controller se encarga de validar el user y el password de un usuario
 * y si está todo OK genera un JWT que se lo devuelve al usuario
 */
export const loginJWTController = async (req, res) => {
    // deconstrucción del objeto body para quedarme con sus atributos
    // email, password
    const { email, password } = req.body;
    // codifico la password para hacer la query con lo que hay en BBDD
    const passEncoded = encodePassword(password);
    // obtengo la información de mi modelo del usuario por email
    const userInfo = await getUserInfoByIdAndPassword(email, passEncoded);
    // compruebo que exista el usuario y que las password coincidan 
    if (userInfo !== null) {
        // generar un token JWT 
        const token = jwt.sign({ user: email }, secret);
        //devolverselo al usuario en una propiedad llamada access_token
        res.send({
            access_token: token
        });
    } else {
        res.status(404).send('Usuario/Contraseña erróneos');
    }

}


/**
 * Este controller se encarga de registrar a un usuario en nuestro sistema
 */
export const registerUserController = async (req, res) => {
    // deconstrucción del objeto body para quedarme con sus atributos
    // email, password
    const { email, password } = req.body;
    // obtengo la información de mi modelo del usuario por email
    const userInfo = await getUserInfoById(email);
    // compruebo que exista el usuario y si no existe puedo darlo de alta 
    if (userInfo === null) {
        // codifico la password para guardarla en BBDD
        const passEncoded = encodePassword(password);
        // creo al usuario en la BBDD
        registerUser(email, passEncoded);
        // genero un token random para el email
        const tokenEmailVerification = generateRandomEmailToken();
        // registro el token en la BBDD asociándolo al email
        registerToken(tokenEmailVerification, email);
        // envío el email de registro con un link apuntando al front, donde le pase el token para poder validarlo cuando el usuario haga click
        sendMail(email, 'Verifica tu cuenta para seguir con el registro', `<a href="http://localhost:3000/validate_email?token=${tokenEmailVerification}">Verificar</a>`)
        //devuelvo al cliente un 201
        res.status(201).send();
    } else {
        // si el usuario ya existe mando al cliente un 409 (conflict), indicando que el usuario 
        // ya existe
        res.status(409).send('El usuario ya existe');
    }

}


export const validateUserController = async (req, res) => {
    // llamo a mi modelo para que me diga si el token es valido o no
    const email = await validateToken(req.query.token);
    // si existe email es que es válido, sino no es válido
    if (email !== undefined) {
        // actualizo el estado del usuario en BBDD a SUCCESS
        await updateUserMailVerification(email);
        //devuelvo al cliente un 200
        res.status(200).send();
    } else {
        // si el usuario ya existe mando al cliente un 409 (conflict), indicando que el usuario 
        // ya existe
        res.status(400).send('Unvalid token');
    }

}