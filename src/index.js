const express= require('express');
const morgan=require('morgan');
const exphbs=require('express-handlebars');
const path=require('path');

//initializations
const app=express();
 //settings
 app.set('port', process.env.PORT||4050);
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
const user="hola";


//Routes
app.use(require('./routes/profesor'));
app.use(require('./routes/usuarios'));

app.use(require('./routes/cuestionarios'));


//Public
app.use(express.static(path.join(__dirname,'public')));

//Starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
})