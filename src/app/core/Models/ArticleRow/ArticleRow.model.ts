export interface ArticleRow {
  id: number;
  text: string;
  image: string;
  articleId:number
}
export interface CreateArticleRow {
  text: string;
  articleId: number;
  image: File;
}

export interface UpdateArticleRow {
  id: number;
  text: string;
  image: File;
}
