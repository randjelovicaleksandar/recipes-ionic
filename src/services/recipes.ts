import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/Rx';

import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/ingredient";
import {AuthService} from "./auth";

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  constructor(private authService: AuthService, private http: HttpClient) {}

  addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
  }

  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  storeList(token: string) {
    const userID = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic3-recipebook-63b44.firebaseio.com/' + userID + '/recipes.json?auth=' + token,
      this.recipes)
      .map((response: any) => {
        return response;
      });
  }

  fetchList(token: string) {
    const userID = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic3-recipebook-63b44.firebaseio.com/' + userID + '/recipes.json?auth=' + token)
      .map((response: any) => {
        const recipes: Recipe[] = response ? response : [];
        for (let item of recipes) {
          if (!item.hasOwnProperty('ingredients')) {
            item.ingredients = [];
          }
        }
        return response;
      })
      .do((recipes: Recipe[]) => {
        if (recipes) {
          this.recipes = recipes;
        } else {
          this.recipes = [];
        }
      });
  }
}
