import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { localKeys } from 'src/app/core/constants/localStorage.keys';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { DynamicFormComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: DynamicFormComponent;
  rememberMe:boolean = false;
  controls:any = {
    controls: [
      {
        name: 'email',
        label: 'Email ID',
        value: '',
        type: 'email',
        placeHolder: 'yourname@email.com',
        errorMessage:'Please enter registered email ID',
        validators: {
          required: true,
          pattern: '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
        },
      },
      {
        name: 'password',
        label: 'Password',
        value: '',
        type: 'password',
        placeHolder: 'Enter password',
        errorMessage: 'Minimum 8 characters needed',
        validators: {
          required: true
        },
      },
    ]
  };
  formData :any= {controls: []}

  constructor(
    private router: Router, 
    private authService: AuthService,
    private toastService : ToastService,
    private localStorage: LocalStorageService ) { }

  ngOnInit(): void {
    this.getRemeberdDetails();
  }

  async getRemeberdDetails () {
    const rememberdDetails = await this.localStorage.getLocalData(localKeys.REMEMBER_ME);
    let details:any = null;
    details
    if(rememberdDetails){
      details = JSON.parse(atob(rememberdDetails));
    }
    for (const control of this.controls.controls) {
      control["value"] = details ? details[control.type] : '';
    }
    this.formData.controls = this.controls.controls;
    
  }

  async onSubmit() {
    (await this.authService.loginAccount(this.loginForm.myForm.value)).subscribe(async (response: any) => {
      if(this.rememberMe){
        this.localStorage.saveLocalData(localKeys.REMEMBER_ME, btoa(JSON.stringify(this.loginForm.myForm.value)) )
      } 
      this.router.navigate(['/home']);
      this.toastService.showMessage("You have loggedin successfully",'success');
    },error =>{
      console.log(error)
      this.toastService.showMessage("Credential mismatch",'error');
    })
   
  }
}
