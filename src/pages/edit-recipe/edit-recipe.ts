import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavParams} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {query} from "@angular/core/src/animation/dsl";

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams, private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  onSubmit() {

  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray> this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    })
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    const newIngredientAlert = this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              return;
            }
            (<FormArray> this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
          }
        }
      ]
    });
    return newIngredientAlert;
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required),
      'ingredients': new FormArray([])
    });
  }
}
