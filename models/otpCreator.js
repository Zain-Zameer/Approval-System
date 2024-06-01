module.exports = (sequelize,DataTypes) =>{
    const otpCreator = sequelize.define("OtpCreator",{
        username: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            },
        },
        OTP: {
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty:true
            },
        }
    },{
        createdAt: true,
    updatedAt: false,
    });
    
    return otpCreator;
}