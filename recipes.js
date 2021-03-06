const mongoose = require('mongoose');
const data = require('./data.js');
const Recipe = require('./models/Recipe.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    Recipe.collection.drop()

      .then(() => {
        return Recipe.create({
          title: 'Gazpacho la mama',
          level: 'Amateur Chef',
          ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
          cuisine: 'Asian',
          dishType: ['Dish'],
          image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
          duration: 40,
          creator: 'Chef LePapu'
        })
          .then((recipe) => console.log(recipe.title))
          .catch((err) => console.log("Error to create one recipe", err))
      })

      .then(() => {
        return Recipe.insertMany(data)
          .then((recipes) => {
            return recipes.forEach(function (e) {
              console.log(e.title)
            })
          })
          .catch((err) => console.log("Error to create many recipes", err))
      })

      .then(() => {
        return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
          .then(() => console.log("Rigatoni alla Genovese duration updated tog 100"))
          .catch((err) => console.log("Error to update", err))
      })

      .then(() => {
        return Recipe.deleteOne({ title: 'Carrot Cake' })
          .then(() => console.log("Carrot Cake was deleted"))
          .catch((err) => console.log("Error to delete one", err))
      })

      .then(() => {
        mongoose.disconnect()
        console.log("DB disconnected");
      })
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  })
