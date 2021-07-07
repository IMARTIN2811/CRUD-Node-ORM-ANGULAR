module.exports = (sequelize, DataTypes)=>{
    const Image = sequelize.define('images', {
        image_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,   
        },
        image: {
            type: DataTypes.BLOB("long"),
            allowNull: false
        } 

    });
    return Image;

}