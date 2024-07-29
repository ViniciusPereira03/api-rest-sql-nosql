const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { sequelize } = require('./src/models/sqlModels');

const sqlListaRoutes = require('./src/routes/sql/listasRoutes');
const sqlItensRoutes = require('./src/routes/sql/itensRoutes');
const sqlProdutosRoutes = require('./src/routes/sql/produtosRoutes');

const nosqlListaRoutes = require('./src/routes/nosql/listasRoutes');
const nosqlItensRoutes = require('./src/routes/nosql/itensRoutes');
const nosqlProdutosRoutes = require('./src/routes/nosql/produtosRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // Para parsear JSON
app.use(cors());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// SQL Routes
app.use('/sql/listas', sqlListaRoutes);
app.use('/sql/itens', sqlItensRoutes);
app.use('/sql/produtos', sqlProdutosRoutes);

// NoSQL Routes
app.use('/nosql/listas', nosqlListaRoutes);
app.use('/nosql/itens', nosqlItensRoutes);
app.use('/nosql/produtos', nosqlProdutosRoutes);

// Start server
const startServer = async () => {
    try {
        // Sincroniza os modelos SQL
        await sequelize.sync();
        console.log('MySQL tables synchronized');

        // Conecta ao MongoDB
        await mongoose.connect('mongodb://localhost:27017/rest_nosql');
        console.log('MongoDB connected');

        // Inicia o servidor Express
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Error starting server:', err);
    }
};

startServer();
