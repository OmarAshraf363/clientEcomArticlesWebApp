import { Component } from '@angular/core';
import { Category, CreateCategory, UpdtaeCategory } from '../../../../core/Models/Category/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../categories/service/category.service';

@Component({
  selector: 'app-admin-catigores',
  templateUrl: './admin-catigores.component.html',
  styleUrl: './admin-catigores.component.scss'
})
export class AdminCatigoresComponent {
categories: Category[] = [];
  form: FormGroup;
  editMode = false;
  selectedCategoryId: number | null = null;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
       description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      console.log(data)
      this.categories = data;
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const updateCategory: UpdtaeCategory =this.form.value;
          const createCatReq:CreateCategory=this.form.value


    if (this.editMode && this.selectedCategoryId !== null) {
      updateCategory.id=this.selectedCategoryId
      this.categoryService.updateCategory(updateCategory).subscribe(() => {
        this.resetForm();
        this.loadCategories();
      });
    } else {
      this.categoryService.createCategory(createCatReq).subscribe(() => {
        this.resetForm();
        this.loadCategories();
      });
    }
  }

  editCategory(category: Category): void {
    this.form.patchValue({ name: category.name,description:category.description });
    this.selectedCategoryId = category.id;
    this.editMode = true;
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  resetForm(): void {
    this.form.reset();
    this.editMode = false;
    this.selectedCategoryId = null;
  }
}


