import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ModalComponent>) {}

  ngAfterViewInit() {
    this.initializeMap();
  }

  initializeMap() {
    const latLng = { lat: this.data.lat, lng: this.data.lon };
    const mapOptions = {
      center: latLng,
      zoom: 15
    };
    const map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    const marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }

  // geocodeAddress(address: string): google.maps.LatLngLiteral {
  //   const geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({ address: address }, (results, status) => {
  //     if (status === google.maps.GeocoderStatus.OK) {
  //       if (results) {
  //         return results[0].geometry.location.toJSON();
  //       }
  //       return ''
  //     } else {
  //       console.log('Geocode was not successful for the following reason: ' + status);
  //       return { lat: 0, lng: 0 };
  //     }
  //   });
  //   return { lat: 0, lng: 0 };
  // }

  onClose() {
    this.dialogRef.close();
  }
}


