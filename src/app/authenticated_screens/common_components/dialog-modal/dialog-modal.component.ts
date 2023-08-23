import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss']
})
export class DialogModalComponent implements OnInit {
  displayModal:boolean=true
  modalContent:any
  data:any
  formvalues:FormGroup=new FormGroup({})
  showPassword:boolean=false
  @Input('modalContent')
  set in (value:any){
    this.modalContent=value
    this.prepareData(this.modalContent['data'])
    }
  @Output()sendmodalData=new EventEmitter<any>()
  constructor( ) { }

  ngOnInit(): void {
  }
  prepareData(dataPoints:any){
    this.data=dataPoints
   if(dataPoints['type']=='form'){
    this.formvalues.reset()
    for(let form of dataPoints['formFields']){
      this.formvalues?.addControl(form.formControlName,form.controlFields)
    }
   }
  }
  sendForm(type:any,formData?:any){
    this.sendmodalData.emit({type:type,data:formData})
  }
  modalClosed(){
    this.closeModal()
  }
  closeModal(){
    this.modalContent['visible']=true
      if(this.formvalues.dirty){
        Swal.fire({
          title:'Are you sure you want to close the popup screen?',
          text: "Note that your data will be deleted upon closing the popup.",
          icon:"warning",
          showCancelButton: true,
          confirmButtonText: 'Close',
          position:"center",
          toast:true

        }).then((res:any)=>{
          if(res.isConfirmed){
            this.modalContent['visible']=false
            this.sendmodalData.emit({type:'Modal_Closed'})
          }
          else{
            this.modalContent['visible']=true
          }

        }).catch((err:any)=> console.log(err))
      }
      else{
        this.modalContent['visible']=false
        this.sendmodalData.emit({type:'Modal_Closed'})
      }
        }

}
