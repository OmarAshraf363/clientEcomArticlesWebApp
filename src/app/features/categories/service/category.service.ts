import { HttpClient } from "@angular/common/http"
import { environment } from "../../../../enviroments/env"
import { Observable } from "rxjs"
import { Category, CreateCategory, UpdtaeCategory } from "../../../core/Models/Category/category.model"
import { Injectable } from "@angular/core"
@Injectable({
    providedIn: 'root'
})
export class CategoryService {
        url=environment.apiUrl
         modelWord=environment.modelWords.category
        constructor(private http :HttpClient){}

        getAllCategories():Observable<Category[]>{
            return this.http.get<Category[]>(`${this.url}/${this.modelWord}/GetAll`)
        }
        getById(id:number){
            return this.http.get(`${this.url}/${this.modelWord}/GetById${id}`)
        }
        createCategory(reqData:CreateCategory){
            return this.http.post(`${this.url}/${this.modelWord}/Add`,reqData)
        }
        updateCategory(reqData:UpdtaeCategory){
            return this.http.put(`${this.url}/${this.modelWord}/Update/`,reqData)
        }
        deleteCategory(id:number){
            return this.http.delete(`${this.url}/${this.modelWord}/Delete/${id}`)
        }
}