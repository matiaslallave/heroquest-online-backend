/**
 * Este archivo implementa todos los handlers (controladores) propios de las rutas del usuario
 */
import { getUserInfoById, addCharacterToUserByUserId } from "./user.model.js";

/**
 * Este es el controller (handler) de la request
 * que obtiene la información de un usuario
 */
export const retrieveUserInfoCtrl = async (req, res) => {
  // Obtengo el user info por id,
  // recogiendo el id del email de la request que puso el JWT Middleware
  const userInfo = await getUserInfoById(req.email);
  // borro la passwod para no exponerla en mi API y no enviarsela a los clientes
  delete userInfo.password;
  // Envio al cliente que realizo la petición los datos del usuario
  res.send(userInfo);
};

export const updateCharactersUserController = async (req, res) => {
  const userInfo = await getUserInfoById(req.email);

  console.log(userInfo.characters);

  const prevChar = userInfo.characters.find(
    (char) => char.name === req.body.character.name
  );

  console.log(prevChar)

  if (prevChar === undefined) {
    addCharacterToUserByUserId(req.body.character, req.email);
    res.status(200).send();
  } else {
    res.status(409).send("char name already registered");
  }
};
