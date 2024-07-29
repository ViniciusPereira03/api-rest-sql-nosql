const { v4: uuidv4 } = require('uuid');
const { Itens } = require('../../models/mongoModels');

const itensController = {};


itensController.add = async (req, res) => {
    try {
        const { fk_lista, fk_produto, quantidade, valor_unidade_produto } = req.body;
        const item = new Itens({ fk_lista, fk_produto, quantidade, valor_unidade_produto, id: uuidv4() });
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(422).json({ message: 'Error adding item', error });
    }
};


itensController.get = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Itens.findOne({id});
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(422).json({ message: 'Error retrieving item', error });
    }
};


itensController.list = async (req, res) => {
    try {
        const id = req.params.id;
        const items = id ? await Itens.find({ fk_lista: id }) : await Itens.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(422).json({ message: 'Error retrieving items', error });
    }
};


itensController.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const { fk_lista, fk_produto, quantidade, valor_unidade_produto } = req.body;
        const result = await Itens.updateOne(
            { id }, 
            { fk_lista, fk_produto, quantidade, valor_unidade_produto },
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const item = await Itens.findOne({id});
        res.status(200).json(item);
    } catch (error) {
        res.status(422).json({ message: 'Error updating item', error });
    }
};


itensController.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Itens.deleteOne({id});
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(204).send();
    } catch (error) {
        res.status(422).json({ message: 'Error deleting item', error });
    }
};

module.exports = itensController;
