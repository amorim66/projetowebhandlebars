const express = require('express');
const exphbr = require('express-handlebars');
const bodyParser = require("body-parser")
const post = require("./models/post")

const app = express();

// Configuração do middleware de análise de corpo
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.post("/cadastrar", function(req, res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function(){
        console.log("Agendamento cadastrado com sucesso!")
        res.redirect('/');
    }).catch(function(erro){
        console.log("Erro: Agendamento não cadastrado!" + erro)
    })
})



app.get('/consultar', async (req, res) => {
    try {
        const agendamentos = await post.findAll({ attributes: ['nome', 'telefone', 'origem', 'data_contato', 'observacao'] });
        res.render('consultar', { agendamentos: agendamentos, title: 'Lista de Agendamentos' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao buscar agendamentos. '});
    }
});


app.get('/atualizar', (req, res) => {
    const title = "Página de Atualização";
    res.render('atualizar', { title });
})