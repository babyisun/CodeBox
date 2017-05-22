import { observable, computed,action ,useStrict} from "mobx";
useStrict(true);

export default class AppState {
 
  @observable items;
  @observable item;
  @observable price;
  @observable name;
  @observable age;


  constructor() {
    this.items = [];
    this.item = {};
    this.price=10;
    this.name="North";
    this.age=28;
  }

  @computed get total() {
  	return this.price * this.items.length;
  }

  @action addItem() {
  	for (var i = 0; i < 1000; i++) {
  		this.items.push({r:Math.random()});
  	}
   	console.log(this.items);
  }

  @action clearItems() {
    this.items = [];
    this.item = {};
  }

}