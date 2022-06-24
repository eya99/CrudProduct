import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../_services/api.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  title = 'workshopp';
  id:any;
  displayedColumns: string[] = ['Nom','Quatité', 'montant','Action'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,private api:ApiService,private tokenStorage: TokenStorageService) {}
  ngOnInit(): void {
   
this.getAlbums() 
 }

  openDialog() {
    this.dialog.open(DialogComponent,{
      width:'30%'

    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAlbums();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAlbums(){
    this.api.getAlbums(this.tokenStorage.getUser().id).subscribe({
      next:(res)=>{

        console.log(res)

this.dataSource= new MatTableDataSource(res);
this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        alert("erro")
      }
    })
  }
  editAlbum(row:any){


    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row

    }).afterClosed().subscribe(val =>{
      if(val==='update'){
        this.getAlbums()
      }
    })

  }
  deleteAlbum(id:any){
    this.api.deleteAlbum(id).subscribe({
      next:(res)=>{
        alert("Album Deleted Successfully")
        this.getAlbums()
      }, 
      error:()=>{
        alert("Error While deleting the album!");
      }
    })

  }

}