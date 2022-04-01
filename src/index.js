const express= require('express');
const morgan=require('morgan');
const exphbs=require('express-handlebars');
const path=require('path');

//initializations
const app=express();
 //settings
 app.set('port', process.env.PORT||4070);
 app.set('views',path.join(__dirname, 'views' ));
 app.engine('.hbs', exphbs({
     defaultLayout:'main',
     layoutsDir:path.join(app.get('views'),'layouts'),
     partialDir:path.join(app.get('views'),'partials'),
     extname:'.hbs',
 }));

 //Middlewares
app.use(morgan('dev'));
app.set('view engine','.hbs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Global Variables
const user="";


//Routes
app.use('/Profesor',require('./routes/profesor'));
app.use('/Usuario',require('./routes/usuarios'));


//Public
app.use(express.static(path.join(__dirname,'public')));

//Starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
})