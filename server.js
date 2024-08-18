import express from 'express'
import routerUsuarios from './routes/usuarioRoute.js'
import routerServidores from './routes/servidorRoute.js'
import expressEjsLayout from 'express-ejs-layouts'
import path from 'path'

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");

app.use('/static', express.static(path.join('node_modules/bootstrap/dist')));
app.use(express.json())
app.use(expressEjsLayout);
app.use(express.urlencoded({ extended: true }));

app.use("/usuarios", routerUsuarios);
app.use("/", routerServidores);

app.listen(5000, function() {
    console.log("servidor web em funcionamento!");
});