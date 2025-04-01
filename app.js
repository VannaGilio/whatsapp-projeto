//Importando Bibliotecas Instaladas
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// const {request} = require ('http')

//Inicia a utilização do express
const app = express ()
app.use(cors()); 

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

//1
app.get('/v1/whatsapp/dados/:numero', cors(), async function(request, response){

    let receberDados = request.params.numero
    let dadosPessoais = whatsUsers.getDadosPessoais(receberDados)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um perfil'})
    }
})

//2
app.get('/v1/whatsapp/perfil/:numero', cors(), async function(request, response) {

    let receberDados = request.params.numero
    let dadosPessoais = whatsUsers.getDadosPerfil(receberDados)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um perfil'})
    }
})

//3
app.get('/v1/whatsapp/contatos/:numero', cors(), async function(request, response) {

    let receberDados = request.params.numero
    let dadosPessoais = whatsUsers.getDadosContatos(receberDados)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um contato'})
    }
})

//4
app.get('/v1/whatsapp/conversas/:numero', cors(), async function(request, response) {
    let numero = request.params.numero
    let dadosPessoais = whatsUsers.getConversasContatos(numero)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um contato'})
    }
})

//5
app.get('/v1/whatsapp/conversas/', cors(), async function(request, response) {
    try {
        const numero = request.query.numero
        const contato = request.query.contato

        const dadosPessoais = whatsUsers.getListarConversas(numero, contato)

        if (dadosPessoais) {
            return response.status(200).json(dadosPessoais)
        } else {
            return response.status(404).json({ status: 404, message: 'Não foi encontrado um contato.' })
        }
    } catch (error) {
        console.error('Erro ao listar conversas:', error)
        return response.status(500).json({ status: 500, message: 'Erro interno do servidor.' })
    }
})

//6
app.get('/v1/whatsapp/conversas/palavra-chave/', cors(), async function(request, response) {

    let numero = request.query.numero
    let palavra = request.query.palavra
    let contato = request.query.contato
    let dadosPessoais = getFiltrarPalavra(numero, palavra, contato)

    if(dadosPessoais){
        response.status(200)
        response.json(dadosPessoais)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado uma conversa'})
    }
})

app.listen('8080', function(){
    console.log('API funcionando...')
})