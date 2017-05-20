const path=require("path");

const PATHS={
    app:path.join(__dirname,"demo","src"),
    build:path.join(__dirname,"demo","dist","js"),
};

module.exports={
    entry:{
        main:path.join(PATHS.app,"index.js"),
    },
    output:{
        path:PATHS.build,
        filename:"[name].js",
    },
    module:{
        loaders:[
            {
                test:/\.jsx?/,
                loaders:["babel-loader"],//自右向左依次加载
            },
            {
                test:/\.css$/,
                loaders: ["style-loader","css-loader", ]
            },
            {
                test:/\.less$/,
                loaders: ["style-loader","css-loader??importLoaders=1",'postcss-loader',"less-loader"]
            },
        ],
    }
}