import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl , Validators  } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  constructor( ) { }
  
  ngOnInit(): void {
      this.contactForm = new FormGroup({
      fullName: new FormControl(null,
               [
                  Validators.required,
                  Validators.minLength(3)
                ]),
      phone: new FormControl(null,
                            [Validators.required,
                            Validators.pattern("^(0[0-9]{9})|(00[0-9]{12})$")
                            ]),
      email: new FormControl(null,
                                [Validators.required,
                                  Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
                                ]),
      subject: new FormControl(null),
      message: new FormControl(null,Validators.required)

 
  });
}
get fullName(){
  return this.contactForm.get('fullName');
}
get email() {
  return this.contactForm.get('email');
}
 get phone() {
   return this.contactForm.get('phone');
 }
get message() {
  return this.contactForm.get('message');
}
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.contactForm.value);
  }
}

