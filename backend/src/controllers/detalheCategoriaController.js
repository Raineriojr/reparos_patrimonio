const connection = require('../database/connection');

module.exports = {
    async create (req, res){
        const admin = req.headers.authorization;
        const { 
            patrimonio,
            marca,
            modelo,
            serial,
            setor_id,
            categoria_id
         } = req.body;

         if(admin !== 'admin'){
            return res.status(401).send('Não autorizado');
        }

        try {
            await connection('detalhe_categoria').insert({
                patrimonio,
                marca,
                modelo,
                serial,
                setor_id,
                categoria_id
            })

            return res.status(200).send('Cadastrado com sucesso');

        } catch (error) {
            return res.send('Erro', error);
        }
    },

    async index(req, res){ //informações sobre patrimonio específico
        const { id } = req.params;

        try {
            const categorias = await connection('detalhe_categoria')
            .where('patrimonio', id)
            .join('categorias', 'id_categoria', '=', 'detalhe_categoria.categoria_id')
            .join('setor', 'id_setor', '=', 'detalhe_categoria.setor_id')
            .select(
                'categorias.categoria',
                'setor.setor',
                'detalhe_categoria.patrimonio', 
                'detalhe_categoria.marca', 
                'detalhe_categoria.modelo', 
                'detalhe_categoria.serial'
            );

            return res.status(200).json(categorias);
        } catch (error) {
            return res.send('Erro');
        }
    },

    async count(req, res){ //patrimonios por setor
        const { id } = req.params;

        try {
            const [count] = await connection('detalhe_categoria')
            .where('categoria_id', id)
            .count();

            const dados = await connection('detalhe_categoria')
            .where('categoria_id', id)
            .select('*');

            res.header('X-Total-Count', count['count(*)'])
            return res.status(200).json(dados);
        } catch (error) {
            return res.send('Erro', error);
        }
    },

    async index2(req, res){ //lista patrimonios por categoria
        const { id } = req.params;
        
        try {
            const dados = await connection('detalhe_categoria').where('categoria_id', id).select('*');

            return res.status(200).json(dados);
        } catch (error) {
            return res.send('Erro')
        }
        
    }
}