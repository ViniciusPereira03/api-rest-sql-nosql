const { Produto } = require('../../models/sqlModels');

const produtosController = {};


produtosController.add = async (req, res) => {
    try {
        const { nome_produto, marca, categoria } = req.body;
        const produto = await Produto.create({ nome_produto, marca, categoria });
        res.status(201).json(produto);
    } catch (error) {
        res.status(422).json({ message: 'Error adding product', error });
    }
};


produtosController.get = async (req, res) => {
    try {
        const id = req.params.id;
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(produto);
    } catch (error) {
        res.status(422).json({ message: 'Error retrieving product', error });
    }
};


produtosController.list = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(422).json({ message: 'Error retrieving products', error });
    }
};


produtosController.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const { nome_produto, marca, categoria } = req.body;
        const [updated] = await Produto.update({ nome_produto, marca, categoria }, { where: { id } });
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        const updatedProduct = await Produto.findByPk(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(422).json({ message: 'Error updating product', error });
    }
};


produtosController.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Produto.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: 'Product not found' });
        res.status(204).send();
    } catch (error) {
        res.status(422).json({ message: 'Error deleting product', error });
    }
};

module.exports = produtosController;
