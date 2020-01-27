import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
newProduct = {};
errors = [];

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { 
    this.newProduct = {"name": "", "quantity": "", "price": ""}
  }

  ngOnInit() {
    this.newProduct = {"name": "", "quantity": "", "price": ""}
  }

  addProduct(){
    let tempObservable = this._httpService.createProduct(this.newProduct)
    tempObservable.subscribe(data => {
      if (data['errors']){
        console.log("There are errors")
        this.errors = data['errors']
        console.log(data['errors'])
      } else {
        console.log("There are NO errors")
        console.log(data);
        this.errors = [];
        this.newProduct = {"name": "", "quantity": "", "price": ""};
        this._router.navigate(['/']);
      }
    });
  }

}
