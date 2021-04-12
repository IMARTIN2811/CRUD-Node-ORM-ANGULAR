//exporta la funcion
module.exports = ( sequelize, Sequelize ) =>{
    //defines the table fields
    const Product = sequelize.define('products', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DECIMAL
        }
        //description: type.INTEGER,
        //score: type.INTEGER
        //title, description,score,director
    });
    return Product;
};