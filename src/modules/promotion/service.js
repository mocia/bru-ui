import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceProductUri = `product`;

 class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "voucher");
  }


  getlist(args) {
    let endpoint = "voucher";
    return super.list(endpoint, args);
  }

  search(args) {
    let endpoint = "voucher/search";
    return super.list(endpoint, args);
  }

  create(args){
    let endpoint = "voucher";
    var request = args;
    // if(args.productPurchase){
    //   var productPurchaseId = args.productPurchase.id;
    //   request.productPurchase = productPurchaseId;
    // }
    // if(args.productGift){
    //   var productGiftId = args.productGift.id;
    //   request.productGift = productGiftId;
    // }
    // if(args.categoryPurchase){
    //   var categoryId = args.categoryPurchase.id;
    //   request.categoryPurchase = categoryId
    // }
    return super.post(endpoint,request);
  }

  edit(args){
    let endpoint = "voucher";
    var request = args;
    // if(args.productPurchase){
    //   var productPurchaseId = args.productPurchase.id;
    //   request.productPurchase = productPurchaseId;
    // }
    // if(args.productGift){
    //   var productGiftId = args.productGift.id;
    //   request.productGift = productGiftId;
    // }
    // if(args.categoryPurchase){
    //   var categoryId = args.categoryPurchase.Id;
    //   request.categoryPurchase = categoryId
    // }
    return super.put(endpoint,request);
    // return 0;
  }
  
  delete(id){
    let endpoint = `voucher/${id}`;
    return super.delete(endpoint);
  }

  getById(id) {
    var endpoint = `voucher/${id}`;
    var promise = this.endpoint.find(endpoint);
    this.publish(promise);
    return promise.then((result) => {
      this.publish(promise);
      console.log("promose %o% :", promise);
      console.log("resutl %o% :", result);
      return Promise.resolve(result);
    });
  }

  getAddressBookById(id) {
    var endpoint = `getAddressBook/${id}`;
    var promise = this.endpoint.find(endpoint);
    this.publish(promise);
    return promise.then((result) => {
      this.publish(promise);
      return Promise.resolve(result);
    });
  }
}

class ServiceProduct extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "productBateeqshop");
  }

  getProductByIds(ids) {
    let endpoint = `${serviceProductUri}/find-by-ids`;
    let queryString = "?";

    if (ids.length > 0)
      ids.map(x => {
        queryString += `productIds=${x}&`
      });

    // return super.list(endpoint, args);
    let promise = this.endpoint.find(endpoint + queryString);
    this.publish(promise);
    return promise.then((result) => {
      this.publish(promise);
      if (result.error)
        return Promise.reject(result.error);
      else
        return Promise.resolve(result)
    });
  }
}

const voucherUri="vouchers";
class VoucherService extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "sales");
  }

  getCustomers(args) {
    let endpoint = `${voucherUri}`;
    return super.list(endpoint, args);
  }

  search(info) {
    var endpoint = `${voucherUri}`;
    var query = '';
    return super.list(endpoint,info);
  //   if (info.email && info.email !== "") {
  //     if (query === '') query = `email=${info.email}`;
  //     else query = `${query}&email=${info.email}`;
  // }
  // if (info.name && info.name !== "") {
  //     if (query === '') query = `name=${info.name}`;
  //     else query = `${query}&name=${info.name}`;
  // }
  // if (info.phoneNumber && info.phoneNumber !== "") {
  //     if (query === '') query = `phoneNumber=${info.phoneNumber}`;
  //     else query = `${query}&phoneNumber=${info.phoneNumber}`;
  // }
  // if (info.dobFrom && info.dobFrom !== "") {
  //     if (query === '') query = `dobFrom=${info.dobFrom}`;
  //     else query = `${query}&dobFrom=${info.dobFrom}`;
  // }
  // if (info.dobTo && info.dobTo !== "") {
  //     if (query === '') query = `dobTo=${info.dobTo}`;
  //     else query = `${query}&dobTo=${info.dobTo}`;
  // } 
  // if (info.membershipTier && info.membershipTier !== "") {
  //   if (query === '') query = `membershipTier=${info.membershipTier}`;
  //   else query = `${query}&membershipTier=${info.membershipTier}`;
}
  
//   if (query !== '')
//       endpoint = `${serviceUri}?${query}`;
//     return super.get(endpoint);
//   }
}

export {
  Service,
  ServiceProduct,
  VoucherService
};
