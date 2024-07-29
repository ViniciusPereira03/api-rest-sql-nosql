const { v4: uuidv4 } = require('uuid');
const { Produto } = require('../../models/mongoModels');

const produtosController = {};

produtosController.add = async (req, res) => {
    try {
        const produtoData = req.body;
        produtoData.id = uuidv4();
        
        const produto = new Produto(produtoData);
        await produto.save();
        res.status(201).json(produto);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(422).json({ message: 'Error adding product', error });
    }
};


produtosController.get = async (req, res) => {
    try {
        const id = req.params.id;
        const produto = await Produto.findOne({id});
        if (!produto) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(produto);
    } catch (error) {
        res.status(422).json({ message: 'Error retrieving product', error });
    }
};


produtosController.list = async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(422).json({ message: 'Error retrieving products', error });
    }
};

produtosController.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const { nome_produto, marca, categoria } = req.body;
        const result = await Produto.updateOne(
            { id },
            { $set: { nome_produto, marca, categoria } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const produto = await Produto.findOne({ id });
        res.status(200).json(produto);
    } catch (error) {
        res.status(422).json({ message: 'Error updating product', error });
    }
};


produtosController.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Produto.deleteOne({id});
        if (!result) return res.status(404).json({ message: 'Product not found' });
        res.status(204).send();
    } catch (error) {
        res.status(422).json({ message: 'Error deleting product', error });
    }
};

module.exports = produtosController;
