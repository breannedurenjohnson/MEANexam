import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product = {};
  errors = [];

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { 
    this.product = {"name": "", "quantity": "", "price": ""};
  }
  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      // console.log(params['id_num'])
      this.showProduct(params['id_num']);
  });
  }

  showProduct(id_num) {
  console.log(`Got one product id param of: ${id_num}`);
  let tempObservable = this._httpService.showProductfromDB(id_num)
  tempObservable.subscribe(data => {
    this.product = data;
    this.errors = [];
    console.log(this.product)
    });
  }

  editProduct(id_num){
    let tempObservable = this._httpService.updateProductfromDB(this.product, id_num)
    tempObservable.subscribe(data => {
      console.log("TS FILE, update product", data);
      if (data['errors']){
        console.log("There are errors")
        this.errors = data['errors']
        console.log(data['errors'])
      } else {
        console.log("There are NO errors")
        console.log(data);
        this.errors = [];
        this.product = {"name": "", "quantity": "", "price": ""};
        this._router.navigate(['/']);
      }
    });
  }
}
