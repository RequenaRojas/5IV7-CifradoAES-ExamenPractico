const express=require('express');
const app= express();
const path= require('path')

//settings
const port= process.env.PORT || 3000
app.set('port',port);
app.set('views', path.join(__dirname,'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');
//middlewares

//routes
app.use(require('./routes/index'));

//static files
app.use(express.static(path.join(__dirname,'public')));

//listing the server
app.listen(app.get('port'), ()=>{
        console.log('puerto del servidor', app.get('port'));
});