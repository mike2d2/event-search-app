import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventSearchComponent implements OnInit {

  event : {keyword, distance, category, location} = {keyword: 'taylor', distance: 23, category: "music", location: "908 everett st los angeles"};
  isChecked: boolean = false;
  latitude:number = NaN;
  longitude:number = NaN;
  isLocationDisabled = false;
  defaultDist = 10
  suggestions:string[] = []

  keywordCtrl = new FormControl();
  filteredMovies: any;
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 3;
  selectedMovie: any = "";

  constructor(public dataService: DataService, private http: HttpClient) { }

  ngOnInit() {
    this.keywordCtrl.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = "";
          this.filteredMovies = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(`${this.dataService.apiUrl}/api/suggest/?keyword=${this.event.keyword}`)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        if (data.length == 0) {
          this.filteredMovies = [];
        } else {
          this.errorMsg = "";
          this.filteredMovies = data;
        }
        console.log(this.filteredMovies);
      });
  }

  onSelected() {
    console.log(this.selectedMovie);
    this.selectedMovie = this.selectedMovie;
  }

  displayWith(value: any) {
    return value;
  }

  clearSelection() {
    this.selectedMovie = "";
    this.filteredMovies = [];
  }

  eventSearch(){
    console.log(this.event);
    this.dataService.eventSearch(this.event);
    this.event = {keyword: '', distance: null, category: "", location: ""};
  }

  submitForm() {
    // if (form.valid) {
    //   console.log('Form submitted!');
    // }
    console.log(this.event);

    if (this.isChecked) {
      this.event.location = this.latitude + ',' + this.longitude
    }
    
    this.dataService.eventSearch(this.event);

    this.event = {keyword: 'taylor', distance: 23, category: "music", location: "908 everett st los angeles"} //{keyword: '', distance: null, category: "", location: ""};
  }

  getSuggestions(): void {
    if (this.event.keyword.length > 3) {
      this.suggestions = this.dataService.getSuggestions(this.event.keyword)
    }
  }

  disableInput(): void {
    this.isLocationDisabled = true;
    this.event.location = ''
  }

  enableInput(): void {
    this.isLocationDisabled = false;
  }

  clearForm(): void {
    this.isLocationDisabled = false;
    this.event.category = 'Default';
    this.event.distance = this.defaultDist
    this.event.location = ''
    this.event.keyword = ''

    // Reset form values here
    // For example: this.myForm.reset();
  }

  onCheckboxChange(event) {
    this.isChecked = event.target.checked;
    if (this.isChecked) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    } else {
      this.latitude = NaN;
      this.longitude = NaN;
    }
  }
}

