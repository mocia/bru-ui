import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
var moment = require("moment"); 

@inject(Router, Service)
export class List {
  info = { page: 1, size: 25 };
  membershipSources =["Auto","Silver","Gold","Platinum"]
    
  form = {
    email: "",
    phoneNumber: "",
    dobFrom: "",
    dobTo: "",
    membershipTier: "Auto",
    name: "",
  };
  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 8,
    },
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }
  attached() {}

  activate() {
    this.searching();
  }

 
  async searching() {
    let args = {
      page: this.info.page,
      pageSize: this.info.size,
      email: this.info.email ? this.info.email : "",
      name: this.info.name ? this.info.name : "",
      phoneNumber: this.info.phoneNumber ? this.info.phoneNumber : "",
      dobFrom: this.info.dobFrom
        ? moment(this.info.dobFrom).format("YYYY-MM-DD")
        : "",
      dobTo: this.info.dobTo
        ? moment(this.info.dobTo).format("YYYY-MM-DD")
        : "",
      membershipTier: this.info.membershipTier ? this.info.membershipTier : "Auto",
    };
    
    this.service.search(args).then((result) => {
    
      this.data=[];
      for(var _data of result){
           
         _data.fullName = _data.firstName + " " + _data.lastName;
          this.data.push(_data);

       }
       console.log(this.data); 
      //   this.info.total = result.total;
       
    });
  }

  formatData(response) {
    let result = response.map((customer) => {
      let fullName = `${customer.firstName} ${customer.lastName}`;
      customer.fullName = fullName;
      customer.isSelected = false;
      return customer;
    });

    return result;
  }

  exportToXls() {
    let args = {
      page: this.info.page,
      pageSize: this.info.size,
      email: this.info.email ? this.info.email : "",
      name: this.info.name ? this.info.name : "",
      phoneNumber: this.info.phoneNumber ? this.info.phoneNumber : "",
      dobFrom: this.info.dobFrom
        ? moment(this.info.dobFrom).format("YYYY-MM-DD")
        : "",
      dobTo: this.info.dobTo
        ? moment(this.info.dobTo).format("YYYY-MM-DD")
        : "",
      membershipTier: this.info.membershipTier ? this.info.membershipTier : "Auto",
    };
    this.service.generateExcel(args);
    console.log(args);
  }

  changePage(e) {
    var page = e.detail;
    this.info.page = page;
    this.searching();
  }

  view(id) {
    this.router.navigateToRoute("view", { id: id });
  }
}
