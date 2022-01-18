const express = require('express')
var cors = require('cors');
const { dbConecction } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.conectarDB();
        this.middleware();
        this.routes();
    }

    async conectarDB(){
        await dbConecction();
    }

    middleware(){
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.static('public'));
    }

    routes(){

        this.app.use('/api/usuarios', require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}

module.exports = Server