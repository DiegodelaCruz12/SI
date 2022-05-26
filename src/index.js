const express= require('express');
const morgan=require('morgan');
const Handlebars=require('handlebars');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
//initializations
const app=express();
 //settings
 app.set('port', process.env.PORT||4090);
 app.set('views',path.join(__dirname, 'views' ));
 app.engine('.hbs', exphbs({
     defaultLayout:'main',
     layoutsDir:path.join(app.get('views'),'layouts'),
     partialDir:path.join(app.get('views'),'partials'),
     extname:'.hbs',
     helpers: {
        IF_EQUALS_ANSWER:function(valor1,valor2,opts){
            var valor1=Handlebars.escapeExpression(valor1),
            valor2=Handlebars.escapeExpression(valor2);
            console.log("aqui va",valor1,valor2);
            return valor1 == valor2 ? opts.fn(this) : opts.inverse(this);  
         },
         SEARCHING_THE_ANSWER:function(valor1){
            var valor1=Handlebars.escapeExpression(valor1);
            console.log("aqui va",valor1);
            switch (valor1){
                case '1': return "res1"
                    break;
                case '2':   return "res2"
                    break;
                case '3': return "res3"
                    break;
                case '4': return "res1"
                    break;
            } 
         }
    } 
 }));
 app.set('view engine','.hbs');

 //Middlewares
 
 app.use(morgan('dev'));
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());

//Global Variables
const user="hola";




//Routes
app.use('/Profesor',require('./routes/profesor'));
app.use('/Usuario',require('./routes/usuarios'));


//Public
app.use(express.static(path.join(__dirname,'public')));

//Starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
})