require('dotenv').config();

const mongoose = require("mongoose");

module.exports = {
  async connect() {
    try {
      console.log(`Tentando conectar-se com o banco de dados...`);
    
      await mongoose.connect(
        process.env.MONGO_URL,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }
      );
      console.log(`Conectado!`);
    } catch (e) {
      console.error(`Erro ao tentar contectar ao banco de dados: ${e.message}`);
    }
  }
}