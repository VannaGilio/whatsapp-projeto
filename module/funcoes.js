/************************************************
 * Objetivo: Revisão -> API manipulação de dados 
 * estatico para uma rede social.
 * Autor: Giovanna Coelho
 * Data: 28/01/2025
************************************************/

const funcoesContatos = require ("./contatos")
// console.log(funcoesContatos)

const getDadosPessoais = function(numero){
    let status = false
    let user = String(numero)
    let dadosPessoais = {}
    let whatsUsers = []

    funcoesContatos.contatos.whatsUsers.forEach(function(item){
            if(String(item.number) == user){
                whatsUsers.push({
                    id: item.id,
                    account: item.account,
                    createSince: item["created-since"],
                    number: item.number
                })
                status = true
            }
        })

        dadosPessoais.dados = whatsUsers

        if(status == true){
            return dadosPessoais
        }else{
            return status
        }
}

//console.log(getDadosPessoais('11987876567'))

const getDadosPerfil = function(numero){
    let status = false
    let user = String(numero)
    let dadosPessoais = {}
    let whatsUsers = []

    funcoesContatos.contatos.whatsUsers.forEach(function(item){
            if(String(item.number) == user){
                whatsUsers.push({
                    nickname: item.nickname,
                    profileImage: item["profile-image"],
                    background: item.background
                })
                status = true
            }
        })

        dadosPessoais.dados_perfil = whatsUsers

        if(status == true){
            return dadosPessoais
        }else{
            return status
        }
}

//console.log(getDadosPerfil('11987876567'))

