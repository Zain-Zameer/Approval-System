module.exports = (sequelize,DataTypes) =>{
    const registeredUser = sequelize.define("RegisteredUsers",{
        username: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            },
        },
        email: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            },
        },
        password: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            },
        },
        position: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            },
        },
    },{
        createdAt: true,
    updatedAt: false,
    });
    
    return registeredUser;
}