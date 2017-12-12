import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {Recipe} from "../../models/recipe";
import {RecipesService} from "../../services/recipes";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[];

  constructor(private navCtrl: NavController, private recipesServices: RecipesService) {}

  ionViewWillEnter() {
    this.recipes = this.recipesServices.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'new'});
  }

  onLoadRecipe() {

  }
}
