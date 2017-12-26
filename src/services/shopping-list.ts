import {Ingredient} from "../models/ingredient";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth";
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
  }

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

  storeList(token: string) {
    const userID = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic3-recipebook-63b44.firebaseio.com/' + userID + '/shopping-list.json?auth=' + token,
      this.ingredients)
      .map((response: any) => {
        return response;
      });
  }

  fetchList(token: string) {
    const userID = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic3-recipebook-63b44.firebaseio.com/' + userID + '/shopping-list.json?auth=' + token)
      .map((response: any) => {
        return response;
      })
      .do((data) => {
        this.ingredients = data;
      });
  }
}
