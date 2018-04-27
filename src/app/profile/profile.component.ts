import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  url = '';
  file: File=null;
  constructor() { }

  ngOnInit() {
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.file = <File>event.target.files[0];
      reader.readAsDataURL(this.file); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
        /*this.releveurForm.get('pic').setValue(/*{
        filename: file.name,
        filetype: file.type,
        value: reader.result.split(',')[1]
        }this.file);*/
        
      }
    }
  }

}
