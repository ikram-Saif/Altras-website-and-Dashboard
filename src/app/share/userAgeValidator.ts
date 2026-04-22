import { AbstractControl , ValidationErrors, ValidatorFn} from '@angular/forms'
import * as moment from 'moment'

export function userAgeValidator():ValidatorFn
{
    return  (control: AbstractControl): ValidationErrors  | null =>{
        const userdob = control.value;

        let years = moment().diff(userdob, 'years');
        if(!userdob){
            return null;
        }
        return userdob && userdob != null && years < 18? { ageNotAllawed: true } : null    

    }
}