import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, ɵgetInjectableDef } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';
import { enviroment } from '../../environments/enviroment';
import { LikesService } from '../services/likes.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private likeService = inject(LikesService);
  baseUrl = enviroment.apiUrl;
  currentUser = signal<User | null>(null);

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(user => {
        if(user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if(user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user:User){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.likeService.getLikeIds();
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

}
