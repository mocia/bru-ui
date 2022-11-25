import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from 'moment';

@inject(Router, Service)
export class List {
  info = { page: 1, size: 25 };
  form = {
    fromDate: "",
    toDate: "",
    orderStatus: "",
    fromTotalOrder: "",
    toTotalOrder: "",
  };
  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 8,
    },
  };
  controlOptionsDate = {
    label: {
      length: 0,
    },
    control: {
      length: 12,
    },
  };
  orderStatusSources = ["PENDING", "FINISHED"];

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  attached() {
    this.options.height =
      $(window).height() -
      $("nav.navbar").height() -
      $("h1.page-header").height();
  }

  attached() {}

  activate() {
    // this.searching();

  }

  search() {
    // this.info.page = 1;
    // this.info.total = 0;
    // if (
    //   this.form.email == "" &&
    //   this.form.name == "" &&
    //   this.form.phoneNumber == "" &&
    //   this.form.dobFrom == "" &&
    //   this.form.dobTo == "" &&
    //   this.form.membershipTier == ""
    // ) {
    //   this.searching();
    // } else {
    //   this.searching("SEARCH");
    // }
  }

  async searching() {
    let args = {
       
      orderStatus: this.form.orderStatus ? this.form.orderStatus : "",
      totalOrderFrom: this.form.fromTotalOrder ? this.form.fromTotalOrder : "",
      totalOrderTo: this.form.toTotalOrder ? this.form.toTotalOrder : "",
      startOrder: this.form.fromDate
        ? moment(this.form.fromDate).format("YYYY-MM-DD")
        : "",
        endOrder: this.form.toDate
        ? moment(this.form.toDate).format("YYYY-MM-DD")
        : "",
    };

    this.service.search(args).then((result) => {
     console.log(result);

       this.data =  result;
      
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
       
      orderStatus: this.form.orderStatus ? this.form.orderStatus : "",
      totalOrderFrom: this.form.fromTotalOrder ? this.form.fromTotalOrder : "",
      totalOrderTo: this.form.toTotalOrder ? this.form.toTotalOrder : "",
      startOrder: this.form.fromDate
        ? moment(this.form.fromDate).format("YYYY-MM-DD")
        : "",
        endOrder: this.form.toDate
        ? moment(this.form.toDate).format("YYYY-MM-DD")
        : "",
    };


    this.service.generateExcel(args);
  }

  changePage(e) {
    var page = e.detail;
    this.info.page = page;
    this.searching();
  }
}
