module.exports=(sequelize,DataType)=>{

    return sequelize.define(
        'role',
        {
            id:{
                type:DataType.STRING,
                primaryKey:true,
                comment:'角色名，命名约定：以 ROLE_ 为前缀，大写',
            },
            name:{
                type:DataType.STRING,
                field:'h_name',
                unique:true,
                allowNull:false,
                comment:'角色别名，唯一，用人类语言描述的角色名',
            },
            description:{
                type:DataType.STRING,   
                comment:'描述',
            }
        },
        {
            tableName:'role'
        }
    );

};