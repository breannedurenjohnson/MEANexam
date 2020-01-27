import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { 
  }

  getProductsfromDB(){
    return this._http.get('/products');
  }
  createProduct(newProduct: object){
    console.log('service file', newProduct)
    return this._http.post('/create_product', newProduct);
  }
  showProductfromDB(id_num) {
    console.log('service', id_num)
    return this._http.get('/show_product/' + id_num);
  }
  updateProductfromDB(product, id_num){
    console.log('service', id_num, product)
    return this._http.put('/update_product/' + id_num, product);
  }

  removeProductfromDB(id_num){
    console.log('service', id_num)
    return this._http.delete('/remove_product/' + id_num);

  }
}
