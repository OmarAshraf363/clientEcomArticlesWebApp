import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { __importDefault } from 'tslib';
import { Article } from '../../../../core/Models/Article/article.model';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../../../core/service/auth.service';
import { ArticleParam } from '../../../../core/Models/articleParam';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { unsubscribe } from 'diagnostics_channel';
import { ArticleService } from '../../../../core/service/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent implements OnInit,OnDestroy {
  subscribtions:Subscription[]=[]




  listOfArticle!: Article[];
  totalCount: number = 0;

  categoryId: number = 0;
  pageSize: number = 3;
  pageNumber: number = 1;
  searchText: string = '';

  data: ArticleParam = {};
  authService: AuthService = inject(AuthService);
  constructor(private articleService: ArticleService, private route: Router) {}
  ngOnInit(): void {
    this.whenCatIdChange();

  let sub2=  this.articleService.searchText
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((searchText) => {
        this.searchText = searchText;
        const articleParam = this.prepareArticleParam();

        this.loadArticles(articleParam);
      });

      this.subscribtions.push(sub2)
  }

  prepareArticleParam(): ArticleParam {
    let articleParam = new ArticleParam();
    articleParam.search = this.searchText;
    articleParam.pageSize = this.pageSize;
    articleParam.pageNumber = this.pageNumber;
    if (this.categoryId != 0) {
      articleParam.categoryId = this.categoryId;
    }
    return articleParam;
  }

  //load articles
  loadArticles(data?: ArticleParam) {
    this.articleService.getAllArticles(data).subscribe({
      next: (response) => {
        
        this.listOfArticle = response.data;
        this.totalCount = response.totalCount;
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
      },
    });
  }

  setArticleIdInService(id: number) {
    this.articleService.setInonArticleClicked(id);
    console.log(`Clicked from articleList and id is ${id}`);
  }

  goToPage(page: number) {
    if (page !== this.pageNumber) {
      this.pageNumber = page;
      this.ngOnInit();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.ngOnInit();
    }
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.ngOnInit();
    }
  }

  whenCatIdChange(): void {
   let sub= this.articleService.catId$.subscribe((data) => {
      this.categoryId = data;
      const articleParam = this.prepareArticleParam();
      this.loadArticles(articleParam);
      
    });
    this.subscribtions.push(sub)
  }
  ngOnDestroy(): void {
    console.log("Un Sub",this.subscribtions)
    this.subscribtions.forEach(sub => sub.unsubscribe());

  }
}
