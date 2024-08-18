import express from 'express'
import routerUsuarios from './routes/usuarioRoute.js'

const app = express();

app.use(express.json())

app.use("/usuarios", routerUsuarios);

app.listen(5000, function() {
    console.log("servidor web em funcionamento!");
});