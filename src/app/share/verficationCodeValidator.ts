import { AbstractControl , ValidationErrors, ValidatorFn} from '@angular/forms'

export function verficationCodeValidator(returnedVCode:string):ValidatorFn
{
    return  (control: AbstractControl): ValidationErrors  | null =>{
        const code = control.value;
        console.log(returnedVCode ,'returned code')

        console.log(code , 'user enterd code')
        if(!code){
            return null;
        }
        return code && returnedVCode &&  code  != returnedVCode? { codeNotMatch: true } : null    

    }
}