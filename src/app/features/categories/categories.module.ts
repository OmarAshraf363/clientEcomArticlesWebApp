import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListPageComponent } from './page/category-list-page/category-list-page.component';
import { CategoryDetailsPageComponent } from './page/category-details-page/category-details-page.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';
import { ActiveLinkDirective } from './dirictives/active-link.directive';



@NgModule({
  declarations: [
    CategoryListPageComponent,
    CategoryDetailsPageComponent,
    CategoryCardComponent,
    CategoriesSectionComponent,
    ActiveLinkDirective
  ],
  imports: [
    CommonModule
  ],
  exports:
  [
    CategoryListPageComponent,
    CategoryDetailsPageComponent,
    CategoryCardComponent,
    CategoriesSectionComponent
  ]
})
export class CategoriesModule { }
