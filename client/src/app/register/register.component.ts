import { Component, EventEmitter, Input ,OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //@Input() usersFromComponent: any; //using for recive data from parente
  @Output() cancelRegister = new EventEmitter();  //using for send data to parent component
  model: any = {}


  constructor(private accountService: AccountService, 
              private toastr: ToastrService
             ) { }
  ngOnInit(): void {

  }

  register(){
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel()
      },
      error: error =>{this.toastr.error(error.error), console.log(error) }
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
  
}
