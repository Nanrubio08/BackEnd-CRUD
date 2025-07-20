const mongoose = require("mongoose")

const conectarDB = async () => {
    try {
        const dburl = process.env.DB_MONGO
        if (!dburl) {
            throw new Error("No se ha definido la varieble DB_MONGO")
        } 
            await mongoose.connect(dburl,{})
            console.log("Conectando a DB...")
            console.log("Conectado Exitosamente")

        } catch (error) {
            console.log("Error al conectart la DB")
            process.exit(1)
    }
    }
    
    module.exports = conectarDB
