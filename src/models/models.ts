export class CarBrand {
  id: number;
  name: string;

  constructor(){
 
  }

}

export class Car {
  id: number;
  model: string;
  car_brands_id: number;
  car_brand: CarBrand;

  constructor(){

  }

}


