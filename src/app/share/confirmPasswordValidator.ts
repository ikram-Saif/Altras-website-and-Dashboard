import { AbstractControl , ValidatorFn , ValidationErrors} from '@angular/forms'


export function confirmPasswordValidator(control : AbstractControl):ValidationErrors | null
{
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        if(password?.pristine|| confirmPassword?.pristine){
            return null;
        }
        return password && confirmPassword && password.value !==  confirmPassword.value ?{passwordNotMatch: true}:null

}
