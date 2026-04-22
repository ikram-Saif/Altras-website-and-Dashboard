import { AbstractControl , ValidatorFn , ValidationErrors} from '@angular/forms'


export function ATMCardValidator(control : AbstractControl):ValidationErrors | null
{
    
        let ATMNumber  = control.get('ATMNumber');
        let ATMConfirm = control.get('confirmCardNum');
        
        if(ATMConfirm?.pristine){
        //     console.log(ATMNumber?.value,'ATMNumber')
        // console.log(ATMConfirm?.value,'ATMConfirm')
            return null;
        }
        return ATMNumber && ATMConfirm && ATMNumber?.value !==  ATMConfirm?.value?{ATMNotMatch: true}:null

        
    }
