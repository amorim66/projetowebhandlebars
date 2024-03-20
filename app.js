const express = require('express');
const exphbr = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Handlebars
app.engine('handlebars', exphbr.engine({defaultLayout: 'main', runtimeOptions:{allowProtoPropertiesByDefault:true,
    allowedProtoMethodsByDefault:true}}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

app.get('/', (req, res) => {
    const title = "Página de Cadastro";
    res.render('index', { title });
})

app.get('/consultar', (req, res) => {
    const title = "Página de Consulta";
    res.render('consultar', { title });
})

app.get('/atualizar', (req, res) => {
    const title = "Página de Atualização";
    res.render('atualizar', { title });
})