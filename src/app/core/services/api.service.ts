import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl:string = environment.apiUrl;

  constructor(private Http:HttpClient) {

  }


  /**
   * The `postItem` method in the `ApiService` class is a function that sends an HTTP POST request to a specified URL with
   * the provided item data. It takes two parameters: `item` of type `any`, which represents the data to be sent in the
   * request body, and `url` of type `string`, which specifies the endpoint where the request will be sent. The method
   * returns an Observable that will emit the response data from the server once the request is completed.
   *
   * @method
   * @name postItem
   * @kind method
   * @memberof ApiService
   * @param {any} item
   * @param {string} url
   * @returns {Observable<any>}
   */
  postItem(item:any, url:string):Observable<any>{

    return this.Http.post(this.baseUrl + url, item);

  }

  postOrder(item:any, url:string):Observable<any>{

    return this.Http.post(`${this.baseUrl + url}/`, item);

  }


  /**
   * The `getItem(url:string):Observable<any>{` method in the `ApiService` class is a function that sends an HTTP GET request
   * to the specified URL. It takes a single parameter `url` of type `string`, which represents the endpoint from which data
   * will be retrieved. The method returns an Observable that will emit the response data from the server once the GET
   * request is completed.
   *
   * @method
   * @name getItem
   * @kind method
   * @memberof ApiService
   * @param {string} url
   * @returns {Observable<any>}
   */
  getItem(url:string, id:any):Observable<any>{

    return this.Http.get<any>(`${this.baseUrl + url}/${id}`);

  }

  /**
   * The `getItems(url:string):Observable<any[]>{` method in the `ApiService` class is a function that sends an HTTP GET
   * request to the specified URL. It takes a single parameter `url` of type `string`, which represents the endpoint from
   * which an array of data will be retrieved. The method returns an Observable that will emit an array of response data from
   * the server once the GET request is completed.
   *
   * @method
   * @name getItems
   * @kind method
   * @memberof ApiService
   * @param {string} url
   * @returns {Observable<any[]>}
   */
  getItems(url:string):Observable<any[]>{

    return this.Http.get<any[]>(this.baseUrl + url);

  }



  /**
   * The `updateItem` method in the `ApiService` class is a function that sends an HTTP PATCH request to the specified URL
   * with the provided item data and ID. It takes three parameters: `item` of type `any`, which represents the data to be
   * sent in the request body, `url` of type `string`, which specifies the endpoint where the request will be sent, and `id`
   * of type `any`, which represents the identifier of the item to be updated. The method returns an Observable that will
   * emit the response data from the server once the request is completed.
   *
   * @method
   * @name updateItem
   * @kind method
   * @memberof ApiService
   * @param {any} item
   * @param {string} url
   * @param {any} id
   * @returns {Observable<any>}
   */
  updateItem(item:any, url:string, id:any):Observable<any>{

    return this.Http.patch(`${this.baseUrl + url}/${id}`, item);

  }

  putItem(item:any, url:string, id:any):Observable<any>{

    return this.Http.put(`${this.baseUrl + url}/${id}`, item);

  }

  /**
   * The `deleteItem(url:string):Observable<any>{` method in the `ApiService` class is a function that sends an HTTP DELETE
   * request to the specified URL. It takes a single parameter `url` of type `string`, which represents the endpoint from
   * which an item will be deleted. The method returns an Observable that will emit the response data from the server once
   * the DELETE request is completed.
   *
   * @method
   * @name deleteItem
   * @kind method
   * @memberof ApiServices
   * @param {string} url
   * @param {any} id
   * @returns {Observable<any>}
   */
  deleteItem(url:string, id:any):Observable<any>{

    return this.Http.delete<any>(`${this.baseUrl + url}/${id}`,);

  }

}
