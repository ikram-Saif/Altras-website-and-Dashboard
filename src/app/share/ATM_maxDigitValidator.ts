import { AbstractControl , ValidationErrors, ValidatorFn} from '@angular/forms'
import * as moment from 'moment'

export function ATM_maxDigitValidator(sudaneseBanks:any):ValidatorFn
{
    return  (control: AbstractControl): ValidationErrors  | null =>{
        // console.log(sudaneseBanks[0],'from validator')

        const ATM_input_value = control.value;
        const bankId = control.get('receiverBank');
        console.log(bankId?.value,'from validator')
        // let ATM_Digit = sudaneseBanks.find((bank:any) => bank.BankID == bankId).ATM_Max_Digits
        // console.log(ATM_Digit,'from validator')

        if(!bankId){
            return null;
        }


        return ATM_input_value && ATM_input_value != null? {ATMInvalidLength: true } : null    

    }
}