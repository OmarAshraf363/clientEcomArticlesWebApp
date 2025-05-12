import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../../../../core/service/article.service';
import { Subscription } from 'rxjs';
import { Article } from '../../../../core/Models/Article/article.model';
import { NgForm } from '@angular/forms';
import { ArticleParam } from '../../../../core/Models/articleParam';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrl: './admin-articles.component.scss'
})
export class AdminArticlesComponent implements OnInit,OnDestroy{
  private articleService = inject(ArticleService);

  articles: Article[] = [];
  totalCount: number = 0;
  pageNumber:number=1
  pageSize:number=3
  searachText:string=""
  

  filters: ArticleParam =new ArticleParam()
  


  subscriptions: Subscription[] = [];
  @ViewChild('filterForm') filterForm!: NgForm;

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(filters?:ArticleParam): void {
     filters=this.prepareFilters()
    const sub = this.articleService.getAllArticles(filters).subscribe({
      next: (res) => {
        console.log(res)
        

          this.articles = res.data;
        
        this.totalCount = res.totalCount;
        this.pageNumber=res.pageNumber
        this.pageSize=res.pageSize
      },
      error: (err) => console.error('Error loading articles', err),
    });

    this.subscriptions.push(sub);
    
  }

  prepareFilters():ArticleParam{
    const filters=new ArticleParam()
    filters.pageSize=this.pageSize
    filters.pageNumber=this.pageNumber
    filters.search=this.searachText
    return filters
  }

  onSearchChange(event:any){
    
  let filters:ArticleParam=new ArticleParam()
  filters.search=event.target.value
    this.loadArticles(filters)
      
    
  }

  onFilter(): void {
    this.filters.pageNumber = 1;
    this.loadArticles();
  }

  onResetFilters(): void {
    this.filters.search = '';
    this.filters.categoryId = 0;
    this.loadArticles();
    this.filterForm.resetForm();
  }

goToNext(){
  this.pageNumber=this.pageNumber+1
  this.loadArticles()
}
goToPrev(){
  this.pageNumber=this.pageNumber-1
  this.loadArticles()
}

  deleteArticle(id: number): void {
    const sub = this.articleService.deleteArticle(id).subscribe({
      next: () => this.loadArticles(),
      error: (err) => console.error('Error deleting article', err),
    });

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }
}

