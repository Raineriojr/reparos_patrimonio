const connection = require('../database/connection');
const bcrypt = require('bcrypt');

let date = new Date().toLocaleDateString("pt-BR", {timeZone: "America/Sao_Paulo"})

function getDate(e){
    const dia = e.split('/')[0]; 
    const mes = e.split('/')[1];
    const ano = e.split('/')[2];
    
    e = ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
    return e;
}

module.exports = {
    async create(req, res){
        const { nome, usuario, senha } = req.body;
        const admin = req.headers.authorization;

        if(admin !== 'admin'){
            return res.status(401).send('Não autorizado');
        }

        bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
            if(errBcrypt){
                return res.status(500).send({erro: errBcrypt})
            }
        
            const senha = hash;

            try {
                await connection('usuarios').insert({
                    nome,
                    usuario,
                    senha,
                    date_created: getDate(date)
                })
                return res.status(200).send('Cadastrado com sucesso.');
    
            } catch (error) {
                return res.status(400).send('Erro ao cadastrar usuário');
            }
        }) 
    },

    async index(req, res){
        try {
            const users = await connection('usuarios').select('*');

            return res.status(200).json(users);

        } catch (error) {

            return res.send('Erro');

        }
    },

    async login(req, res){
        const { usuario, senha } = req.body;

        const user = await connection('usuarios').where('usuario', usuario).first();
        
        if(!user){ 
                return res.status(500).send({mensagem: 'Usuário ou senha incorretos'})
        }
        
        bcrypt.compare(senha, user.senha).then((result)=>{
            if(result === true){
                    return res.status(200).json({ id: user.id_usuario, nome: user.nome });
            } else {
                return res.status(500).send({mensagem: 'Usuário ou senha incorretos'})
            }
        })
        
    }


}