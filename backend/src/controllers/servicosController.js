const connection = require('../database/connection');

module.exports = {
    async create (req, res){
        const admin = req.headers.authorization;
        const { categoria, titulo } = req.body;

        if(admin !== 'admin'){
            return res.status(401).send('Não autorizado');
        }

        try {
            await connection('servicos').insert({
                categoria,
                titulo
            })

            return res.status(200).send('Cadastrado com sucesso');

        } catch (error) {
            return res.status(400).send('Categoria inválida')
        }
    },

    async index(req, res){ //lista serviços por categoria
        const { id } = req.params;

        try {
            const dados = await connection('servicos')
            .where('categoria', id)
            .select('*')

            return res.status(200).json(dados);

        } catch (error) {
            return res.send('Erro');
        }
        
    },

    async delete(req, res){
        const { id } = req.params;
        const admin = req.headers.authorization;

        if(admin !== 'admin'){
            return res.status(401).send('Não autorizado');
        }

        try {
            await connection('servicos').where('id_servico', id).delete();

            return res.status(200).send('Removido');
        } catch (error) {
            return res.status(400).send('Erro');
        }
    }
}
