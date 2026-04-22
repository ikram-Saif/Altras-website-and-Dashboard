import { AbstractControl , ValidatorFn , ValidationErrors} from '@angular/forms'


export function confirmEmailValidator(control : AbstractControl):ValidationErrors | null
{
        const email = control.get('email');
        const confirmEmail = control.get('confirmEmail');
        if(email?.pristine|| confirmEmail?.pristine){
            return null;
        }
        return email && confirmEmail && email.value !==  confirmEmail.value ?{emailNotMatch: true}:null

}
