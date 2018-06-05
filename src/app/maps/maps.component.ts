import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { PdlService } from '../services/pdl.service';
import { Observable } from "rxjs/Observable";
import { Pdl } from '../models/pdl';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgZone } from '@angular/core';



declare var google:any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit{
  pdls:any;
  adresses:any[];
  array:any[];
  private test:string;

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  latitude: any;
  longitude: any;
  errorMessage:string;
  currentLat: any;
  currentLong: any;

  marker: google.maps.Marker;
  constructor(
    private pdlService:PdlService,
     private zone: NgZone,
    ){
    
  }

  ngOnInit() {
    this.pdls=new Array<Pdl>();
    //this.getPdls();
    //console.log(this.pdls);


    
    

    var mapProp = {
      center: new google.maps.LatLng(36.806495, 10.181532),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    //this.showAll();
    
    this.findMe();
    this.faketraj();
    this.pdlService.getPdls()
      .subscribe(
        data => {
          for(let d of data){
            this.pdls.push(d);
            //let position:any;
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': d.pdl_ADRESS}, function(results, status) {
              if (status == 'OK') {
                //this.map.setCenter(new google.maps.LatLng(results[0].geometry.location));
                /*let positiont=google.maps.LatLng(34.739822, 10.760020);
                var marker = new google.maps.Marker({
                  position: google.maps.LatLng(34.739822, 10.760020),
                  map: this.map,
                  //title: 'Votre position',
                  showWindow:true,
                  animation: google.maps.Animation.DROP,
                  icon:'../../assets/icons/flag48.png'
                });*/
                let position=results[0].geometry.location;
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((position) => {
                    this.showLocation(position);
                  });
                } else {
                  alert("Geolocation is not supported by this browser.");
                }
               
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });
          }
        },
        err => {
          console.log(err);
        }
      );
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


    showLocation(location) {
      this.map.panTo(location);
        this.marker = new google.maps.Marker({
          position: location,
          map: this.map,
          //title: 'Votre position',
          showWindow:true,
          animation: google.maps.Animation.DROP,
          icon:'../../assets/icons/flag48.png',
          //icon: iconBase + 'parking_lot_maps.png',
          //label:'TOI',
        });
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

    faketraj(){
      //let location= google.maps.LatLng(36.837786,10.200792);
      //this.showPositions(36.837786,10.200792,"Tournee1 PDL1",'../../assets/icons/flag48.png');
      let location1 = new google.maps.LatLng(36.872125, 10.203538);
      let marker1 = new google.maps.Marker({
           position: location,
           map: this.map,
           title: 'Tournee1 PDL2',
           showWindow:true,
           animation: google.maps.Animation.DROP,
           icon:'../../assets/icons/flag48.png',
         });
      //this.showPositions(36.872125,10.203538,'Tournee1 PDL2','../../assets/icons/flag48.png');
      let location2 = new google.maps.LatLng(36.837786, 10.200792);
      let marker2 = new google.maps.Marker({
           position: location,
           map: this.map,
           title: 'Tournee1 PDL1',
           showWindow:true,
           animation: google.maps.Animation.DROP,
           icon:'../../assets/icons/flag48.png',
         });
      this.showPositions(36.906835,10.190492,'Tournee1 PDL3','../../assets/icons/flag48.png');
      this.showPositions(36.945259,10.166460,'Tournee1 PDL4','../../assets/icons/flag48.png');
      this.showPositions(36.892670,10.092989,'Tournee2 PDL1','../../assets/icons/flag48.png');
      this.showPositions(36.941254,10.092645,'Tournee2 PDL2','../../assets/icons/flag48.png');
      this.showPositions(36.983775,10.090242,'Tournee2 PDL3','../../assets/icons/flag48.png');
    }
  
    showPositions(lat, long, message,iconx) {
      let location = new google.maps.LatLng(lat, long);
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
     
     marker.addInfoWindow(location,this.map,message);
    }

    showAll(){
      this.pdlService.getPdls()
      .subscribe(
        data => {
          for(let d of data){
            this.pdls.push(d);
            let position:any;
            this.getLocation(d.pdl_ADRESS).subscribe(data=>{
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
    },
    err => {
      console.log(err);
    }

  );

    }

  

    getPdls(){
      this.pdlService.getPdls()
      .subscribe(
        data => {
          for(let d of data){
            this.pdls.push(d);
          }
        },
        err => {
          console.log(err);
        }
   
      );
    }

    getLocation(address: string): Observable<any> {
      let geocoder = new google.maps.Geocoder();
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