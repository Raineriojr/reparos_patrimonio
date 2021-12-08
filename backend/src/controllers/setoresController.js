const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        try {
            const [count] = await connection('setor').count();
            const setores = await connection('setor').select('*');
            
            res.header('X-Total-Count', count['count(*)'])
            return res.status(200).json(setores);

        } catch (error) {

            return res.status(400).send("Erro", error);
            
        }
        
    }
}