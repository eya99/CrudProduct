import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ApiService } from '../_services/api.service';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  albumForm!: FormGroup
  actionBtn : string = "Save"
  value:any;



  constructor(private formBuilder : FormBuilder,private api:ApiService,private tokenStorage: TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef:MatDialogRef<DialogComponent>) { }
   
  ngOnInit(): void {
    this.albumForm = this.formBuilder.group({

      productName:['',Validators.required],
      amountAvailable:['',Validators.required],
      cost:['',Validators.required],
     
        "seller" : {
            "id" : this.tokenStorage.getUser().id
           
        }
    


    })
    console.log(this.editData)
    if(this.editData){
      this.actionBtn="Update"
      this.albumForm.controls["productName"].setValue(this.editData.productName);
      this.albumForm.controls["amountAvailable"].setValue(this.editData.amountAvailable);
      this.albumForm.controls["cost"].setValue(this.editData.cost);


    }
  }
  addAlbum(){
    if(!this.editData){
    console.log(this.albumForm.value)
    if(this.albumForm.valid){
     
      
      this.api.postAlbum(this.albumForm.value).subscribe({
        next:(res)=>{
          alert("Album added with succes");
          this.albumForm.reset();
          this.dialogRef.close("save");



        },
        error:()=>{
          alert("error")
        }
      })
    }}
    else{
      this.updateAlbum()
    }


  }
  updateAlbum(){

    this.api.putAlbum(this.albumForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Product updated Succefully");
        this.albumForm.reset();
        this.dialogRef.close("update");



      },
      error:()=>{
        alert("Error While updating the record")
      }
    })

  }
}
