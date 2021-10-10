// importo la librería para validar el JWT
import jwt from 'jsonwebtoken';
import { secret } from './auth.secret.js';

/**
 * Entidad Auth expone un middleware para que las rutas 
 * que necesiten auth no tengan que escribirlo
 */
export const validateJWTAuth = (req, res, next) => {
    // Obtener el token JWT de la cabecera Authorization
    const headerAuth = req.get('Authorization'); // Bearer jwtStringToken
    // Separo el tipo de autenticación de su valor
    const jwtToken = headerAuth?.split(' ')[1]; // Obtengo solo el valor del JWT
    // Validar el JWT, si no se puede validar, se lanza un excepcion
    try{
        const jwtDecoded = jwt.verify(jwtToken, secret);
        // para que las siguientes rutas no se tengan que preocupar
        // de validar tokens JWT, guardo el id del usuario en la req
        req.email = jwtDecoded.user;
        next();
    }catch(err){
        console.log(err);
        res.status(401).send('Usuario sin token válido');
    }
    
}