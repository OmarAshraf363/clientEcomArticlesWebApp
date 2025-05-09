import { HttpClient } from "@angular/common/http"
import { environment } from "../../../../enviroments/env"
import { Observable } from "rxjs"
import { Category } from "../../../core/Models/Category/category.model"
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
        createCategory(reqData:FormData){
            return this.http.post(`${this.url}/${this.modelWord}/add`,reqData)
        }
        updateCategory(reqData:FormData,id:number){
            return this.http.put(`${this.url}/${this.modelWord}/update/${id}`,reqData)
        }
        deleteCategory(id:number){
            return this.http.delete(`${this.url}/${this.modelWord}/delete/${id}`)
        }
}