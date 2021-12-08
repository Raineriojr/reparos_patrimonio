const connection = require('../database/connection');

module.exports = {
    async create(req, res){
        const { categoria } = req.body;
        const admin = req.headers.authorization;

        if(admin !== 'admin'){
            return res.status(401).send('Não autorizado');
        }

        try {
            await connection('categorias').insert({
                categoria
            })

            return res.status(200).send('Cadastrado com sucesso!');

        } catch (error) {
            return res.status(400).send('Erro ao cadastrar categoria');
        }
        
    },

    async index(req, res){
        try {
            const categorias = await connection('categorias').select('*');

            return res.status(200).json(categorias);
        } catch (error) {
            return res.status(400).send("Erro");
        }
    },

    async delete(req, res){
        const { id } = req.params;
        const admin = req.headers.authorization;

        if(admin !== 'admin'){
            return res.status(401).send('Não autorizado');
        }

        try {
            await connection('categorias').where('id_categoria', id).delete();

            return res.status(200).send('Categoria Removida');
        } catch (error) {
            return res.status(400).send('Erro');
        }
    }
}