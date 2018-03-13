import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from './../../providers/api/api';

import { CarBrand, Car } from '../../models/models';

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CarsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cars',
  templateUrl: 'cars.html',
})
export class CarsPage {

	/**
	 * Objeto para crear un nuevo auto
	 * @type {Car}
	 */
	car: Car;
	
	/**
	 * Variable donde almacenaremos la lista de autos
	 * @type {Array<Car>}
	 */
	cars: Array<Car> = [];

	/**
	 * Variable donde almacenaremos la lista de marcas de auto
	 * @type {Array<CarBrand>}
	 */
	carBrands: Array<CarBrand> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, private alertCtrl: AlertController) {

 

  }

  /**
   * Funcion que se ejecuta cuando se ingresa a la pagina actual
   */
  ionViewDidEnter() {

 	/**
  	 * Inicializamos el objetop auto
  	 */
  	this.car = new Car();


  	/**
  	 * Obtenemos las marcas de autos
  	 */
  	this.getAllCarBrands();

  	/**
  	 * Obtenemos todos los autos
  	 */
  	this.getAllCars();

  }

  openModalNewCar(){

  		this.car = new Car();

	  	let alert = this.alertCtrl.create({
	    title: 'Nuevo Auto',
	    subTitle: 'Escribe el nombre del modelo',
	    inputs: [
	      {
	        name: 'model',
	        placeholder: 'modelo del auto'
	      }
	  	],
	    buttons: [
	      {
	        text: 'Cancelar',
	        role: 'cancel',
	        handler: data => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: 'Siguiente',
	        handler: data => {

	        	/**
	        	 * asignacion del nombre del modelo del auto
	        	 */
	        	this.car.model = data.model;
	        	this.openModalBrandNewCar();
	         
	        }
	      }
	    ]
	  });

	  alert.present();


  }

  openModalBrandNewCar(){

  	 var inputs = [];

     for (var i = 0; i < this.carBrands.length; i++) {
        inputs.push({type: 'radio', label: this.carBrands[i].name, value: this.carBrands[i].id});
     }


    inputs[0].checked = true;
        

	let alert = this.alertCtrl.create({
	    title: 'Nuevo Auto',
	    subTitle: 'Selecciona la marca del auto',
	    inputs:  inputs,
	    buttons: [
	      {
	        text: 'Cancelar',
	        role: 'cancel',
	        handler: data => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: 'Guardar',
	        handler: data => {

	        	/**
	        	 * asignacion del identificador de la marca del auto
	        	 */
	        	this.car.car_brands_id = data;
	        	this.addCar();
	         	

	        }
	      }
	    ]
	  });
	  alert.present();

  }



  openModalEditCar(car){

  		this.car = car;

	  	let alert = this.alertCtrl.create({
	    title: 'Editar Auto',
	    subTitle: 'Escribe el nombre del modelo',
	    inputs: [
	      {
	        name: 'model',
	        value: this.car.model,
	        placeholder: 'modelo del auto'
	      }
	  	],
	    buttons: [
	      {
	        text: 'Cancelar',
	        role: 'cancel',
	        handler: data => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: 'Siguiente',
	        handler: data => {

	        	/**
	        	 * asignacion del nombre del modelo del auto
	        	 */
	        	this.car.model = data.model;
	        	this.openModalBrandEditCar();
	         
	        }
	      }
	    ]
	  });
	  alert.present();


  }

  openModalBrandEditCar(){

  	 var inputs = [];

     for (var i = 0; i < this.carBrands.length; i++) {

        inputs.push({type: 'radio', label: this.carBrands[i].name, value: this.carBrands[i].id});

     	if(this.carBrands[i].id == this.car.car_brands_id){
     	    inputs[i].checked = true;
     	}
     }
        

	let alert = this.alertCtrl.create({
	    title: 'Editar Auto',
	    subTitle: 'Selecciona la marca del auto',
	    inputs:  inputs,
	    buttons: [
	      {
	        text: 'Cancelar',
	        role: 'cancel',
	        handler: data => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: 'Guardar',
	        handler: data => {

	        	/**
	        	 * asignacion del identificador de la marca del auto
	        	 */
	        	this.car.car_brands_id = data;
	        	this.editCar();
	         	

	        }
	      }
	    ]
	  });
	  alert.present();

  }


  /**
   * Funcion que obtiene todos las marcas de autos
   */
  getAllCarBrands(){


      this.apiProvider.getAllBrands().then((result) => {
	
		this.carBrands = result;	
		console.log(this.carBrands);

		}, (err) => {

	        console.log(err);
	    });

  }

  /**
   * Funcion que obtiene todos los autos
   */
  getAllCars(){

      this.apiProvider.getAllCars().then((result) => {

      	this.cars = result;
		
		console.log(this.cars);

		}, (err) => {

	        console.log(err);
	    });



  }

  /**
   * Funcion que agrega un auto
   */
  addCar(){

      this.apiProvider.addCar(this.car).then((result) => {
			
      		this.car = result;
      		
      		console.log(result);
			console.log(this.car);

		  	/**
		  	 * Obtenemos todos los autos
		  	 */
		  	this.getAllCars();

		}, (err) => {

	        console.log(err);
	    });


  }

  /**
   * Funcion que edita un auto
   */
  editCar(){

      this.apiProvider.editCar(this.car).then((result) => {
			
			this.car = result;
      		console.log(result);
			console.log(this.car);

		  	/**
		  	 * Obtenemos todos los autos
		  	 */
		  	this.getAllCars();

		}, (err) => {

	        console.log(err);
	    });

  }

  /**
   * Funcion que elimina un auto
   */
	deleteCar(car){

		this.car = car;

 		this.apiProvider.deleteCar(this.car).then((result) => {
			
			console.log(result);

		  	/**
		  	 * Obtenemos todos los autos
		  	 */
		  	this.getAllCars();			

		}, (err) => {

	        console.log(err);
	    });

	}	




  ionViewDidLoad() {
    console.log('ionViewDidLoad CarsPage');
  

  }



}
