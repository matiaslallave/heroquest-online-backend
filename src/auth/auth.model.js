import { MongoClient } from "mongodb";
import { DDBB_URL, DDBB_NAME, EMAIL_VERIFY_COLLECTION } from "../adapters/databaseinfo.js";

export const retrieveEmailByToken = async (token) => {
    const query = {
        token,
      };
    
      const client = await MongoClient.connect(DDBB_URL);
    
      const data = await client.db(DDBB_NAME).collection(EMAIL_VERIFY_COLLECTION).findOne(query);
    
      client.close();
    
      return data?.email;
}


/**
 * registrar token asociado al email
 */
export const registerToken = async (token, email) => {
    const newItem = {
        token: token,
        email: email
      };
    
      const client = await MongoClient.connect(DDBB_URL);
    
      const data = await client.db(DDBB_NAME).collection(EMAIL_VERIFY_COLLECTION).insertOne(newItem);
    
      client.close();
    
      return data;
}

/**
 * Borramos el token de nuestro modelo
 */
export const deleteToken = async (token, email) => {

    const query = {
        token,
        email
      };
    
      const client = await MongoClient.connect(DDBB_URL);
    
      await client.db(DDBB_NAME).collection(EMAIL_VERIFY_COLLECTION).deleteOne(query);

      client.close();
}

/**
 * intentamos obtener el token si es valido devolvemos el email y borramos el token
 */
export const validateToken = async (token) => {
    const email = await retrieveEmailByToken(token);
    if (email !== null) deleteToken(token, email);
    return email;
}


