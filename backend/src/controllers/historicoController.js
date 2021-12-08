const connection = require('../database/connection');

module.exports = {
    async indexOPen(req, res){ //Lista chamados encerrados
        try {
            const [count] = await connection('historico')
            .whereNotNull('data_retorno')
            .join('servicos', 'id_servico', '=', 'historico.servico_id' )
            .join('usuarios', 'id_usuario', '=', 'historico.user_id')
            .innerJoin('detalhe_categoria', 'historico.patrimonio','=', 'detalhe_categoria.patrimonio' )
            .innerJoin('categorias', 'detalhe_categoria.categoria_id', '=', 'categorias.id_categoria')
            .count();

            const dados = await connection('historico')
            .whereNotNull('data_retorno')
            .join('servicos', 'id_servico', '=', 'historico.servico_id' )
            .join('usuarios', 'id_usuario', '=', 'historico.user_id')
            .innerJoin('detalhe_categoria', 'historico.patrimonio','=', 'detalhe_categoria.patrimonio' )
            .innerJoin('categorias', 'detalhe_categoria.categoria_id', '=', 'categorias.id_categoria')
            .select(
                'historico.id',
                'categorias.categoria',
                'historico.patrimonio',
                'historico.data_saida',
                'historico.data_retorno',
                'servicos.titulo',
                'usuarios.nome',
            );

            res.header('X-Total-Count', count['count(*)'])
            return res.status(200).json(dados);

        } catch (error) {
            return res.send('Erro')
        }
    },

    async indexClose(req, res){ //Lista chamados em aberto
        try {
            const [count] = await connection('historico')
            .whereNull('data_retorno')
            .join('servicos', 'id_servico', '=', 'historico.servico_id' )
            .join('usuarios', 'id_usuario', '=', 'historico.user_id')
            .innerJoin('detalhe_categoria', 'historico.patrimonio','=', 'detalhe_categoria.patrimonio' )
            .innerJoin('categorias', 'detalhe_categoria.categoria_id', '=', 'categorias.id_categoria')
            .count();

            const dados = await connection('historico')
            .whereNull('data_retorno')
            .join('servicos', 'id_servico', '=', 'historico.servico_id' )
            .join('usuarios', 'id_usuario', '=', 'historico.user_id')
            .innerJoin('detalhe_categoria', 'historico.patrimonio','=', 'detalhe_categoria.patrimonio' )
            .innerJoin('categorias', 'detalhe_categoria.categoria_id', '=', 'categorias.id_categoria')
            .select(
                'historico.id',
                'categorias.categoria',
                'historico.patrimonio',
                'historico.data_saida',
                'historico.data_retorno',
                'servicos.titulo',
                'usuarios.nome',
            );

            res.header('X-Total-Count', count['count(*)'])
            return res.status(200).json(dados);

        } catch (error) {
            return res.send('Erro')
        }
    },

    async registers(req, res){ //Lista histórico de chamados por patrimonio
        const { id } = req.params;
        try {
            const [count] = await connection('historico')
            .where('patrimonio', id)
            .join('usuarios', 'id_usuario', '=', 'historico.user_id')
            .innerJoin('servicos', 'historico.servico_id','=', 'servicos.id_servico' )
            .innerJoin('categorias', 'servicos.categoria', '=', 'categorias.id_categoria')
            .count();

            const dados = await connection('historico')
            .where('patrimonio', id)
            .join('usuarios', 'id_usuario', '=', 'historico.user_id')
            .innerJoin('servicos', 'historico.servico_id','=', 'servicos.id_servico' )
            .innerJoin('categorias', 'servicos.categoria', '=', 'categorias.id_categoria')
            .select(
                'historico.id',
                'categorias.categoria',
                'historico.patrimonio',
                'historico.data_saida',
                'historico.data_retorno',
                'servicos.titulo',
                'usuarios.nome',
            )

            res.header('X-Total-Count', count['count(*)'])
            return res.status(200).json(dados);

        } catch (error) {
            return res.send('Erro')
        }
    },

    async create(req, res){
        const { 
            data_saida,
            servico_id,
            patrimonio,
            user_id
        } = req.body;

        try {
            await connection('historico').insert({
                data_saida,
                servico_id,
                patrimonio,
                user_id
            })
    
            return res.status(200).send('Cadastrado com sucesso');

        } catch (error) {
            return res.send('Erro');
        }
    },

    async update(req, res){
        const { id, data_retorno } = req.body;

        try {
            await connection('historico')
            .where('id', id)
            .update({
                data_retorno: data_retorno
            })

            return res.status(200).send('Sucesso');
            
        } catch (error) {
            return res.send('Erro')
        }
    }
}