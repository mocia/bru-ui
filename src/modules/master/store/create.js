import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';

@inject(Router, Service)
export class Create {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  activate(params) {

  }

  list() {
    this.router.navigateToRoute('list');
  }

  cancelCallback(event) {
    this.list();
  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  saveCallback(event) {
    var er={};
    if(!parseFloat(this.data.longitude)){
      if(this.data.longitude!="0"){
        er.longitude = "longitude harus angka";
        this.error = er;
      }
    }
    
    if(!parseFloat(this.data.latitude)){
      if(this.data.latitude!="0"){
        er.latitude = "latitude harus angka";
        this.error = er;
      }
    }
    if(!parseFloat(this.data.salesTarget) || this.data.salesTarget!=0){
      if(this.data.salesTarget!="0"){
        er.salesTarget = "Sales Target harus angka";
        this.error = er;
      }
    }
    if(!parseFloat(this.data.monthlyTotalCost)){
      if(this.data.monthlyTotalCost!="0"){
        er.monthlyTotalCost = "Monthly Total Cost harus angka";
        this.error = er;
      }
    }
    if(!er.monthlyTotalCost && !er.salesTarget && !er.latitude&& !er.longitude){
      this.service.create(this.data)
        .then(result => {
          alert("Data berhasil dibuat");
          this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
        })
        .catch(e => {
          this.error = e;
        })
    }
  }
}
