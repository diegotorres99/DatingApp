import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav', 
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit{

  model: any = {};
  //currentUser$: Observable<User | null> = of(null); 

  constructor(public accounService: AccountService, 
              private router: Router,
              private toastr: ToastrService
  ){}

  ngOnInit():void{
    //this.currentUser$ = this.accounService.currentUser$;
  }

  login(){
    this.accounService.login(this.model).subscribe({

      next: _ => this.router.navigateByUrl('/members'), //_ we're not using an argument for this
      error: error => this.toastr.error(error.error)
      
    })
  }
  
  logout(){
    this.accounService.logout();
    this.router.navigateByUrl('/');
  }

}
