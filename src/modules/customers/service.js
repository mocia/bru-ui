import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = 'customer';
export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "sales");
  }

  getCustomers(args) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, args);
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    var query = '';
    if (info.email && info.email !== "") {
      if (query === '') query = `email=${info.email}`;
      else query = `${query}&email=${info.email}`;
  }
  if (info.name && info.name !== "") {
      if (query === '') query = `name=${info.name}`;
      else query = `${query}&name=${info.name}`;
  }
  if (info.phoneNumber && info.phoneNumber !== "") {
      if (query === '') query = `phoneNumber=${info.phoneNumber}`;
      else query = `${query}&phoneNumber=${info.phoneNumber}`;
  }
  if (info.dobFrom && info.dobFrom !== "") {
      if (query === '') query = `dobFrom=${info.dobFrom}`;
      else query = `${query}&dobFrom=${info.dobFrom}`;
  }
  if (info.dobTo && info.dobTo !== "") {
      if (query === '') query = `dobTo=${info.dobTo}`;
      else query = `${query}&dobTo=${info.dobTo}`;
  } 
  if (info.membershipTier && info.membershipTier !== "") {
    if (query === '') query = `membershipTier=${info.membershipTier}`;
    else query = `${query}&membershipTier=${info.membershipTier}`;
}
  
  if (query !== '')
      endpoint = `${serviceUri}?${query}`;
    return super.get(endpoint);
  }

  getCustomersById(id) {
    var endpoint = `${serviceUri}/${id}`;
    var promise = this.endpoint.find(endpoint);
    this.publish(promise);
    return promise.then((result) => {
      this.publish(promise);
      return Promise.resolve(result.data);
    });
  }

  getAddressBookById(id) {
    var endpoint = `${serviceUri}/address/${id}`;
    var promise = this.endpoint.find(endpoint);
    this.publish(promise);
    return promise.then((result) => {
      this.publish(promise);
      return Promise.resolve(result.data);
    });
  }
  getOrderByUserId(id) {
    var endpoint = `${serviceUri}/order/${id}`;
    var promise = this.endpoint.find(endpoint);
    this.publish(promise);
    return promise.then((result) => {
      this.publish(promise);
      return Promise.resolve(result.data);
    });
  }
  generateExcel(info) {
    var query = '';
    if (info.email && info.email !== "") {
      if (query === '') query = `email=${info.email}`;
      else query = `${query}&email=${info.email}`;
  }
  if (info.name && info.name !== "") {
      if (query === '') query = `name=${info.name}`;
      else query = `${query}&name=${info.name}`;
  }
  if (info.phoneNumber && info.phoneNumber !== "") {
      if (query === '') query = `phoneNumber=${info.phoneNumber}`;
      else query = `${query}&phoneNumber=${info.phoneNumber}`;
  }
  if (info.dobFrom && info.dobFrom !== "") {
      if (query === '') query = `dobFrom=${info.dobFrom}`;
      else query = `${query}&dobFrom=${info.dobFrom}`;
  }
  if (info.dobTo && info.dobTo !== "") {
      if (query === '') query = `dobTo=${info.dobTo}`;
      else query = `${query}&dobTo=${info.dobTo}`;
  } 
  if (info.membershipTier && info.membershipTier !== "") {
    if (query === '') query = `membershipTier=${info.membershipTier}`;
    else query = `${query}&membershipTier=${info.membershipTier}`;
}
  
  if (query !== '')
  
  var endpoint = `${serviceUri}/download?${query}`;
  console.log(endpoint);
    
    return super.getXls(endpoint);
  }
}
