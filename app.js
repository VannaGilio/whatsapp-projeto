//Importando Bibliotecas Instaladas
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// const {request} = require ('http')

//Inicia a utilização do express
const app = express ()

//configuração do header -> quem poderá requisitar a API
app.use((request, response, next) =>{
    //Permissão de onde virão as requisições na API
    /*Acces... -> Origem da API*/  
    /* ,'' -> Quem pode acessar (IP, ou * -> todos)*/
    response.header('Access-Control-Allow-Origin', '*')
    
    //Permissão de quais metodos a API irá responder
    /* METODOS -> GET - Pegar dados da API || POST - Salvar dados na API || PUT - Alterar um dado API || DELETE = Deletar um dado na API */
    response.header('Access-Control-Allow-Methods', 'GET') 

    //Aplica as restrições no CORS da requisição
    app.use(cors())

    next()
})

const whatsUsers = require("./module/funcoes")

app.get('/v1/whatsapp/dados/pessoal/:numero', cors(), async function(request, response){

    let receberDados = request.params.numero
    let dadosPessoais = whatsUsers.getDadosPessoais(receberDados)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um estado'})
    }
})

app.get('/v1/whatsapp/perfil/:numero', cors(), async function(request, response) {

    let receberDados = request.params.numero
    let dadosPessoais = whatsUsers.getDadosPerfil(receberDados)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um estado'})
    }
})

app.get('/v1/whatsapp/contatos/:numero', cors(), async function(request, response) {

    let receberDados = request.params.numero
    let dadosPessoais = whatsUsers.getDadosContatos(receberDados)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um estado'})
    }
})

app.get('/v1/whatsapp/conversas/:numero', cors(), async function(request, response) {

    let receberDados = request.params.numero
    let dadosPessoais = whatsUsers.getConversasContatos(receberDados)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um estado'})
    }
})

app.get('/v1/whatsapp/conversas/:numero', cors(), async function(request, response) {

    let receba = request.query.n
    let receberDados = request.params.numero
    let dadosPessoais = whatsUsers.getConversasContatos(receberDados)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um estado'})
    }
})

app.listen('8080', function(){
    console.log('API funcionando...')
})

