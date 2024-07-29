const { v4: uuidv4 } = require('uuid');
const { Lista } = require('../../models/mongoModels');

const listasController = {};


listasController.add = async (req, res) => {
    try {
        const { nome, descricao, data_compra } = req.body;
        const listaData = { nome, descricao, data_compra, id: uuidv4() };
        
        const lista = new Lista(listaData);
        await lista.save();
        res.status(201).json(lista);
    } catch (error) {
        res.status(422).json({ message: 'Error adding list', error });
    }
};


listasController.get = async (req, res) => {
    try {
        const id = req.params.id;
        const lista = await Lista.findOne({id});
        if (!lista) return res.status(404).json({ message: 'List not found' });
        res.status(200).json(lista);
    } catch (error) {
        res.status(422).json({ message: 'Error retrieving list', error });
    }
};


listasController.list = async (req, res) => {
    try {
        const listas = await Lista.find();
        res.status(200).json(listas);
    } catch (error) {
        res.status(422).json({ message: 'Error retrieving lists', error });
    }
};


listasController.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, descricao, data_compra } = req.body;
        const result = await Lista.updateOne(
            { id }, 
            { nome, descricao, data_compra }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'List not found' });
        }

        const lista = await Lista.findOne({id});
        res.status(200).json(lista);
    } catch (error) {
        res.status(422).json({ message: 'Error updating list', error });
    }
};


listasController.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const lista = await Lista.deleteOne({id});
        if (!lista) return res.status(404).json({ message: 'List not found' });
        res.status(204).send();
    } catch (error) {
        res.status(422).json({ message: 'Error deleting list', error });
    }
};

module.exports = listasController;
