import { inject, Injectable, signal } from '@angular/core';
import { enviroment } from '../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class LikesService {
  baseUrl = enviroment.apiUrl;
  private http = inject(HttpClient);
  likeIds = signal<number[]>([]);
  
  toggleLike(targetId: number){
    return this.http.post(`${this.baseUrl}likes/${targetId}`, {})
  }

  getLikes(predicate: string){
    return this.http.get(`${this.baseUrl}likes?predicate=${predicate}`);
  }

  getLikeIds(){
    return this.http.get<number[]>(`${this.baseUrl}likes/list`).subscribe({
      next: ids => this.likeIds.set(ids)
    })
  }
}
