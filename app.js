const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const Post = require("./models/post");
const Handlebars = require('handlebars');

const app = express();

// Configuração do middleware de análise de corpo
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Registrar o helper equal
Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
      throw new Error("Handlebars Helper 'equal' needs 2 parameters");
    if (lvalue === rvalue) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  

// Configuração do Handlebars
app.engine('handlebars', exphbs.engine({defaultLayout: 'main', runtimeOptions:{allowProtoPropertiesByDefault:true,
    allowedProtoMethodsByDefault:true}}));
app.set('view engine', 'handlebars');
app.set('views', './views');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Definindo rotas
app.get('/', (req, res) => {
    const title = "Página de Cadastro";
    res.render('index', { title });
});

app.post("/cadastrar", function(req, res){
    Post.create({
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
    });
});

app.get('/consultar', async (req, res) => {
    try {
        const agendamentos = await Post.findAll({ attributes: ['id', 'nome', 'telefone', 'origem', 'data_contato', 'observacao'] });
        res.render('consultar', { agendamentos: agendamentos, title: 'Lista de Agendamentos' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao buscar agendamentos. '});
    }
});

app.get('/atualizar/:id', async (req, res) => {
    const title = "Página de Atualização";
    try {
        const id = req.params.id;
        const post = await Post.findByPk(id);
        res.render('atualizar', { post, title });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o formulário de edição');
    }
});

app.post('/posts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Post.update(req.body, { where: { id: id } });
        res.redirect('/consultar');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar o Post');
    }
});

app.get("/excluir/:id", function(req, res){
    Post.destroy({where: {"id": req.params.id}}).then(function(){
        console.log("Agendamento excluído com sucesso!");
        res.redirect('/consultar');
    }).catch(function(erro){
        console.log("Erro: Agendamento não excluido!" + erro)
    });
});
