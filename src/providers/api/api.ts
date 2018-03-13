import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CarBrand, Car } from '../../models/models';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
 	
  apiHost: string; 	

  constructor(public http: HttpClient) {

  	 this.apiHost = "http://192.168.1.68:80/automoviles/";
  }

  /**
   * Obtener todos los autos
   * @return {Promise<Car[]>} [description]
   */
  getAllCars() :Promise<Car[]> {

    return new Promise((resolve, reject) => {
    
      this.http.get(this.apiHost+'Cars/getAllCars')
    
        .subscribe( (res:Array<Car>) => {
    
          resolve(res);
    
        }, (err) => {
    
          reject(err);
    
        });
    
    });
  
  }


  /**
   * Obtener todas las marcas de autos
   * @return {Promise<CarBrand[]>} [description]
   */
  getAllBrands() :Promise<CarBrand[]> {

    return new Promise((resolve, reject) => {
    
      this.http.get(this.apiHost+'CarBrands/getAllBrands')
    
        .subscribe( (res:Array<CarBrand>) => {
    
          resolve(res);
    
        }, (err) => {
    
          reject(err);
    
        });
    
    });
  }


  /**
   * Agregar un auto
   * @param  {[type]}             data [description]
   */
  addCar(data) :Promise<Car> {

    return new Promise((resolve, reject) => {
    
      this.http.post(this.apiHost+'Cars/addCar', JSON.stringify(data))
    
        .subscribe( (res: Car ) => {
    
          resolve(res);
    
        }, (err) => {
    
          reject(err);
    
        });
    
    });
  }



  /**
   * Editar un auto
   * @param  {[type]}             data [description]
   */
  editCar(data) :Promise<Car> {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiHost+'Cars/editCar', JSON.stringify(data))
        .subscribe( (res: Car) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  /**
   * Eliminar un auto
   * @param  {[type]}             data [description]
   */
  deleteCar(data) :Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiHost+'Cars/deleteCar', JSON.stringify(data))
        .subscribe( (res: any) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  } 


}
