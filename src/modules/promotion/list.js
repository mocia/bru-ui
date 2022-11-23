import { inject, bindable } from "aurelia-framework";
import { Service,VoucherService } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service,VoucherService)
export class List {
  @bindable flag = false;

  context = ["Detail"];

  columns = [
    // {
    //   field: "isSelected",
    //   title: "isSelected Checkbox",
    //   checkbox: true,
    //   sortable: false,
    //   formatter: function(value, data, index) {
    //       this.checkboxEnabled = (data.status.toLowerCase() == 'active');
    //       return ""
    //   }
    // },
    { title: "Discount Name", field: "DiscountName" },
    { title: "Discount Type", field: "DiscountType" },
    {
      title: "Start Date", field: "StartDate", formatter: function (value, data, index) {
        return moment(value).format('DD/MM/YYYY')
      }
    },
    {
      title: "End Date", field: "EndDate", formatter: function (value, data, index) {
        return moment(value).format('DD/MM/YYYY')
      }
    },
    { title: "Total Used", field: "TotalClaimed" },
    { title: "Status", field: "Status" }
  ];

  voucherTypeSources = [
    "",
    "Percentage",
    "Nominal",
    "Buy n free m",
    "Buy n discount m%",
    "Buy n discount m% product (n)th",
    "Pay nominal Rp.xx, Free 1 product",
  ];

  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 8,
    },
  };

  constructor(router, service,voucherService) {
    this.service = service;
    this.router = router;
    this.voucherService=voucherService;
  }

  loader = (info) => {
    let args = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      pageSize: info.limit,
      keyword: info.search ? info.search : ''
    }

    if (this.flag) {
      console.log(this.info.voucherType)
      if (this.info.voucherType) {
        switch (this.info.voucherType) {
          case "Percentage":
            args.voucherType = "1";
            break;
          case "Nominal":
            args.voucherType = "0";
            break;
          case "Buy n free m":
            args.voucherType = "3";
            break;
          case "Buy n discount m%":
            args.voucherType = "5";
            break;
          case "Buy n discount m% product (n)th":
            args.voucherType = "6";
            break;
          case "Pay nominal Rp.xx, Free 1 product":
            args.voucherType = "7";
            break;
          default:
            args.voucherType = "0";
            break;
        }
      }

      args.startDate = this.info.startDate ? moment(this.info.startDate).format("MM/DD/YYYY") : "01/01/0001"
      args.endDate = this.info.endDate ? moment(this.info.endDate).format("MM/DD/YYYY") : "01/01/0001"
      args.code = this.info.discountCode ? this.info.discountCode : ""
      args.name = this.info.discountName ? this.info.discountName : ""
    }

    return this.voucherService.search(args).then((result) => {
      console.log(result)
      return {
        total: result.total,
        data: result.data,
      };
    });
  }

  search() {
    this.flag = true;
    this.tableList.refresh();
  }

  reset() {
    this.flag = false;
    this.error = {};
    this.info = {};
    this.tableList.refresh();
  }

  create() {
    this.router.navigateToRoute("create");
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Detail":
        this.router.navigateToRoute('view', { id: data.id });
        break;
    }
  }
}
