import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // for subscribing valueChanges
    // this.signUpForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    // for subscribing statusChanges
    this.signUpForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    // Set Values
    this.signUpForm.setValue({
      'userData': {
        'username': 'Abey',
        'email': 'abey@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });

    // Patch Value
    this.signUpForm.setValue({
      'userData': {
        'username': 'Rithu'
      }
    });
  }

  onSubmit() {
    console.log(this.signUpForm);

    // You can pass an object to reset() to reset to specific values.
    this.signUpForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {'nameIsFrobidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
