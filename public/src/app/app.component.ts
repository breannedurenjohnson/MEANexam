import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: any;

constructor(private _httpService: HttpService){
  //initialize as empty array upon contruction
  this.products = [];
  this.getProducts();
}

ngOnInit(){
  this.getProducts();
}

getProducts(){
  let tempObservable = this._httpService.getProductsfromDB()
  tempObservable.subscribe(data => {
    console.log("Got our products, ts file", data);
    this.products = data;
    console.log(this.products)
  });
}

}