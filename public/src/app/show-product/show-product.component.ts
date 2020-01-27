import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  product = {};
  errors = [];

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { 
    this.product = {"name": "", "quantity": "", "price": ""};
  }
    
    ngOnInit() {
      this._route.params.subscribe((params: Params) => {
        console.log(params['id_num'])
        this.showProduct(params['id_num']);
    });
  }

  showProduct(id_num) {
    console.log(`Got one product id param of: ${id_num}`);
    let tempObservable = this._httpService.showProductfromDB(id_num)
    tempObservable.subscribe(data => {
      console.log(data);
      this.product = data;
      console.log(this.product)
      });
    }

  deleteProduct(id_num) {
    console.log(`Product w id_num param of: ${id_num}`);
    let tempObservable = this._httpService.removeProductfromDB(id_num)
    tempObservable.subscribe(data => {
      if (data['errors']){
        console.log("There are errors")
        this.errors = data['errors']
        console.log(data['errors'])
      } else {
        console.log("There are NO errors")
        console.log(data);
        this.errors = [];
        this._router.navigate(['/']);
      }
    });
  }

}
