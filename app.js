import express from 'express'; // importo express para hacer una app
import cors from 'cors'; // importo el cors para que los navegadores me puedan llamar
import userRouter from './src/user/user.router.js';
import authRouter from './src/auth/auth.router.js';
import characterRouter from './src/character/character.router.js';
import gameRouter from "./src/game/game.router.js"
import monsterRouter from "./src/monster/monster.router.js"



const app = express(); // creo una app

app.use(cors()); // librería que implementa el cors en mi backend
app.use(express.json()) // permito al app que formatee el body en JSON

app.use('/static', express.static('public')); // expongo mi carpeta public-static al mundo
// le indico a la app que el path /user va a ser gestionado por userRouter
app.use('/user', userRouter); 
// Le indico a la app que en el path /login hay un router que lo gestiona
app.use('/auth', authRouter);

app.use('/character', characterRouter);

app.use('/game', gameRouter);

app.use('/monster', monsterRouter);

 // levanto el servidor en el puerto 4567
app.listen(4567, () => console.log('Server listening at port 4567'))