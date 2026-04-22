import { HttpClient } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl , Validators  } from '@angular/forms';
import {UploadDocumentsService} from '../upload-documents.service'


@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {
  fileName = '';
  documentTypeList:any = ['Identity','Address','Source OF Fund']
  listOfSpecificType:any
  objectKeys : any =[]
  newArr: any =[]
  afuConfig = {
    uploadAPI: {
      url:"https://m.altras.co.uk/uinfo.php?tk=M2FmMDQyNTUtOWQ0OC00ZTBjLWI3OTAtNmExZDcwZTliNzJk"
    }
};

  constructor(private fb:FormBuilder , private uploadDocService :UploadDocumentsService,private http: HttpClient) {
    this.uploadDocumentForm.patchValue({

      documentType:this.documentTypeList[0]
    })
    this.getDocumentType()

   }

  uploadDocumentForm = this.fb.group({

    documentType: [null],
    document:[null],
    uploadFile:[null]
   });
    get documentType(){
      return this.uploadDocumentForm.get('documentType');
    }
    get document(){
      return this.uploadDocumentForm.get('document');
    }
    get uploadFile(){
      return this.uploadDocumentForm.get('uploadFile');
    }

  ngOnInit(): void {
    // this.uploadDocumentForm.patchValue({

    //   documentType:this.documentTypeList[0]
    // })
    // this.getDocumentType()

  }

  getDocumentType(){

     this.uploadDocService.getProofTypeList(this.documentType?.value)
   .subscribe(
     (response: any)=> {
       this.listOfSpecificType = response
       this.objectKeys = Object.keys(this.listOfSpecificType[0])[1]
       this.getlistOfSpecificType(this.listOfSpecificType,this.objectKeys)
      },
      error => console.error(error,'error')
   )
  //  console.log(this.listOfSpecificType,'proof type')
  }
  getlistOfSpecificType(list:any , key:string){
    this.newArr = []
    list.map((doc:any) => {
      this.newArr.push(doc[key])

    })
  }
  onFileSelected(event:any){
    const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append("thumbnail", file);

            const upload$ = this.http.post("https://altrasuk.com/documents/", formData);

            upload$.subscribe((response:any)=>{
              console.log(response,'response')
            },
            error => console.log(error , 'error')
            );

  }
}

}
