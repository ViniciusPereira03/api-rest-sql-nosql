const { Lista } = require('../../models/sqlModels');

const listasController = {};


listasController.add = async (req, res) => {
    try {
        const { nome, descricao, data_compra } = req.body;
        const lista = await Lista.create({ nome, descricao, data_compra });
        res.status(201).json(lista);
    } catch (error) {
        res.status(422).json({ message: 'Error adding list', error });
    }
};


listasController.get = async (req, res) => {
    try {
        const id = req.params.id;
        const lista = await Lista.findByPk(id);
        if (!lista) return res.status(404).json({ message: 'List not found' });
        res.status(200).json(lista);
    } catch (error) {
        res.status(422).json({ message: 'Error retrieving list', error });
    }
};


listasController.list = async (req, res) => {
    try {
        const listas = await Lista.findAll();
        res.status(200).json(listas);
    } catch (error) {
        res.status(422).json({ message: 'Error retrieving lists', error });
    }
};


listasController.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, descricao, data_compra } = req.body;
        const [updated] = await Lista.update({ nome, descricao, data_compra }, { where: { id } });
        if (!updated) return res.status(404).json({ message: 'List not found' });
        const updatedList = await Lista.findByPk(id);
        res.status(200).json(updatedList);
    } catch (error) {
        res.status(422).json({ message: 'Error updating list', error });
    }
};


listasController.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Lista.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: 'List not found' });
        res.status(204).send();
    } catch (error) {
        res.status(422).json({ message: 'Error deleting list', error });
    }
};

module.exports = listasController
