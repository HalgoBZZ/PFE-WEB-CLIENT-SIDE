import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { PdlService } from '../services/pdl.service';
import { Observable } from "rxjs/Observable";
import { Pdl } from '../models/pdl';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


declare var google:any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit{
  private pdls:any;
  private adresses:any;
  private test:string;

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  latitude: any;
  longitude: any;
  errorMessage:string;
  currentLat: any;
  currentLong: any;

  marker: google.maps.Marker;
  constructor(private pdlService:PdlService){
  }

  ngOnInit() {
    this.pdls=new Array<Pdl>();
    this.adresses=new Array<String>();
    this.getPdls();
    //console.log(this.pdls);
   // console.log(this.test);
    //this.pdls=this.pdlService.fetchPdls();
    //console.log(this.pdls.map(material => material.length));

    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    
    //this.showAll();

    /*for (let pdl of this.pdls){
      let position:any;
      this.getLocation(pdl.pdl_ADRESS).subscribe(data=>{
        position=data;
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        },
        err =>{
        console.log(err);
      });
    }*/
    //console.log(this.pdls);
   console.log(this.adresses);
   this.getLocation(this.adresses[0]).subscribe(data=>{
    let position=data;
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    });
    this.showAll();
    this.findMe();
  }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }

  setCenter() {
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

    let location = new google.maps.LatLng(this.latitude, this.longitude);

    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
    });
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position,"Votre emplacement",'../../assets/icons/per.png');
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

    showPosition(position, message,iconx) {
      this.currentLat = position.coords.latitude;
      this.currentLong = position.coords.longitude;
      var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
      let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.panTo(location);
      if (!this.marker) {
        this.marker = new google.maps.Marker({
          position: location,
          map: this.map,
          //title: 'Votre position',
          icon:iconx,
          showWindow:true,
          animation: google.maps.Animation.DROP
          //icon:'../../assets/icons/flag48.png',
          //icon: iconBase + 'parking_lot_maps.png',
          //label:'TOI',
        });
      }
      else {
        this.marker.setPosition(location);
      }
     this.addInfoWindow(location,this.map,message);
    }

    addInfoWindow(location, map,message){
      let infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(this.marker, 'click', function()
      {
        infowindow.setContent(message);
        infowindow.setPosition(location);
        infowindow.open(map);
      });
    }
  
    showAll(){
      for (let adr of this.adresses){
        let position:any;
        this.getLocation(adr).subscribe(data=>{
          position=data;
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          },
          err =>{
          console.log(err);
        });
        let message="";
        this.MarkPosition(position,message,'../../assets/icons/flag48.png')
      }

    }

    getPdls() {
      this.pdlService.getPdls()
      .subscribe(
        data => {
          for(let d of data){
            this.pdls.push(d);
            this.adresses.push(d.pdl_ADRESS);
          }
        },
        err => {
          console.log(err);
        }
   
      );
    }

    getLocation(address: string): Observable<any> {
      let geocoder = new google.maps.Geocode();
      return Observable.create(observer => {
          geocoder.geocode({
              'address': address
          }, (results, status) => {
              if (status == google.maps.GeocoderStatus.OK) {
                  observer.next(results[0].geometry.location);
                  observer.complete();
              } else {
                  console.log('Error: ', results, ' & Status: ', status);
                  observer.error();
              }
          });
      });
    }

    MarkPosition(position, message,iconx) {
      let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //this.map.panTo(location);
         let marker = new google.maps.Marker({
          position: location,
          map: this.map,
          //title: 'Votre position',
          icon:iconx,
          showWindow:true,
          animation: google.maps.Animation.DROP
          //icon:'../../assets/icons/flag48.png',
          //icon: iconBase + 'parking_lot_maps.png',
          //label:'TOI',
        });
        marker.setPosition(location);
     this.addInfoWindow(location,this.map,message);
    }

}