//npm init
//npm i express
//npm i body-parser
//npm i axios (if you want to interact with an API)
//npm i ejs
//type into package.json, "type": "module",

import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

const APIKey = "1";

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended : true }));

app.get("/", async (req, res) => {
    try {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

        var cocktails = [];

        for(var i=0; i<alphabet.length; i++) {
            
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${APIKey}/search.php?f=${alphabet[i]}`);
            cocktails[i] = response.data.drinks;
        }

        res.render("all.ejs", { cocktails: cocktails });
    } catch (error) {
        console.log(error);
    }
});

app.post("/drink", async (req, res) => {
    try{
        const cocktailID = req.body.cocktailID;
    
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${APIKey}/lookup.php?i=${cocktailID}`);
        const cocktail = response.data.drinks[0];

        const ingredients = [cocktail.strIngredient1, cocktail.strIngredient2, cocktail.strIngredient3, cocktail.strIngredient4, cocktail.strIngredient5, cocktail.strIngredient6, cocktail.strIngredient7, cocktail.strIngredient8, cocktail.strIngredient9, cocktail.strIngredient10, cocktail.strIngredient11, cocktail.strIngredient12, cocktail.strIngredient13, cocktail.strIngredient14, cocktail.strIngredient15];
        const measures = [cocktail.strMeasure1, cocktail.strMeasure2, cocktail.strMeasure3, cocktail.strMeasure4, cocktail.strMeasure5, cocktail.strMeasure6, cocktail.strMeasure7, cocktail.strMeasure8, cocktail.strMeasure9, cocktail.strMeasure10, cocktail.strMeasure11, cocktail.strMeasure12, cocktail.strMeasure13, cocktail.strMeasure14, cocktail.strMeasure15];
    
    
        res.render("index.ejs", {cocktail: cocktail, ingredients: ingredients, measures: measures});
    } 
    catch (error){
        console.log(JSON.stringify(error));
    }
});

app.get("/random", async (req, res) => {
    try {

        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${APIKey}/random.php`);

        const cocktail = response.data.drinks[0];        

        const ingredients = [cocktail.strIngredient1, cocktail.strIngredient2, cocktail.strIngredient3, cocktail.strIngredient4, cocktail.strIngredient5, cocktail.strIngredient6, cocktail.strIngredient7, cocktail.strIngredient8, cocktail.strIngredient9, cocktail.strIngredient10, cocktail.strIngredient11, cocktail.strIngredient12, cocktail.strIngredient13, cocktail.strIngredient14, cocktail.strIngredient15];
        const measures = [cocktail.strMeasure1, cocktail.strMeasure2, cocktail.strMeasure3, cocktail.strMeasure4, cocktail.strMeasure5, cocktail.strMeasure6, cocktail.strMeasure7, cocktail.strMeasure8, cocktail.strMeasure9, cocktail.strMeasure10, cocktail.strMeasure11, cocktail.strMeasure12, cocktail.strMeasure13, cocktail.strMeasure14, cocktail.strMeasure15];


        res.render("index.ejs", {cocktail: cocktail, ingredients: ingredients, measures: measures});
    }
    catch (error){
        console.log(JSON.stringify(error));
    }
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});