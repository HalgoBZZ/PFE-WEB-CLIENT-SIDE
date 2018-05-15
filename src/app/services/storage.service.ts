import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable()
export class StorageService {

  private data:any;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}


  saveInLocal(key, val): void {
    console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
   }

   getFromLocal(key,val): void {
    console.log('recieved= key:' + key);
    //this.data[key]= this.storage.get(key);
    val=this.storage.get(key);
    //console.log(this.data);
   }

   getData(){
     return this.data;
   }
}
