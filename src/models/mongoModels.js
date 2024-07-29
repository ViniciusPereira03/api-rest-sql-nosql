const mongoose = require('mongoose')

const produtoCollection = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    nome_produto: String,
    marca: String,
    categoria: String,
    created: {
        type: Date,
        default: Date.now
    }
})
const Produto = mongoose.model('produto', produtoCollection)

const listaCollection = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    nome: String,
    descricao: String,
    data_compra: Date,
    created: {
        type: Date,
        default: Date.now
    }
})
const Lista = mongoose.model('lista', listaCollection)

const itensCollection = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    fk_lista: Number,
    fk_produto: Number,
    quantidade: Number,
    valor_unidade_produto: Number,
    created: {
        type: Date,
        default: Date.now
    }
})
const Itens = mongoose.model('itens', itensCollection)


module.exports = {
    Produto,
    Lista,
    Itens
}