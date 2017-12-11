import {Ingredient} from "../models/ingredient";
import {Injectable} from "@angular/core";

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
    // Tri tacke razdvajaju niz na pojedinacne elemente
  }

  getItems() {
    return this.ingredients.slice();
    // prazan slice napravi samo kopiju niza
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }
}
