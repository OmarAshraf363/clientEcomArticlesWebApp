import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Like, LikeResponse } from '../../../../core/Models/Like/like.model';
import { Subscription } from 'rxjs';
import { LikeService } from '../../services/like.service';
import { environment } from '../../../../../enviroments/env';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrl: './like.component.scss',
})
export class LikeComponent implements OnInit, OnDestroy {
  likes: LikeResponse[] = [];
  imageUrl=environment.imagesURL
  subs = new Subscription();
  private readonly likeSrvice = inject(LikeService);
  ngOnInit(): void {
    const sub = this.likeSrvice.articleId$.subscribe({
      next: (id) => {
        if (id != 0) {
          this.loadLikes(id);
        }
      },
    });

        this.subs.add(sub);

  }
  loadLikes(id: number): void {
    const sub1 = this.likeSrvice.getArticleLkes(id).subscribe({
      next: (data) => {
        console.log(data);
        this.likes = data;
      },
    });
    this.subs.add(sub1);
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
