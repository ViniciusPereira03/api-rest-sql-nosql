const { Itens } = require('../../models/sqlModels');

const itensController = {};


itensController.add = async (req, res) => {
    try {
        const { fk_lista, fk_produto, quantidade, valor_unidade_produto } = req.body;
        const item = await Itens.create({ fk_lista, fk_produto, quantidade, valor_unidade_produto });
        res.status(201).json(item);
    } catch (error) {
        res.status(422).json({ message: 'Error adding item', error });
    }
};


itensController.get = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Itens.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(422).json({ message: 'Error retrieving item', error });
    }
};


itensController.list = async (req, res) => {
    try {
        const items = await Itens.findAll();
        res.status(200).json(items);
    } catch (error) {
        res.status(422).json({ message: 'Error retrieving items', error });
    }
};


itensController.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const { fk_lista, fk_produto, quantidade, valor_unidade_produto } = req.body;
        const [updated] = await Itens.update({ fk_lista, fk_produto, quantidade, valor_unidade_produto }, { where: { id } });
        if (!updated) return res.status(404).json({ message: 'Item not found' });
        const updatedItem = await Itens.findByPk(id);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(422).json({ message: 'Error updating item', error });
    }
};


itensController.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Itens.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: 'Item not found' });
        res.status(204).send();
    } catch (error) {
        res.status(422).json({ message: 'Error deleting item', error });
    }
};

module.exports = itensController;
