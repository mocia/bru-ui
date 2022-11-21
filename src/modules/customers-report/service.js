import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"; 

const serviceUri = 'customer/reportCustomer';
const MaxWHServiceUri = 'max-wh-confirms';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    search(info) {
        console.log(info);
        var endpoint = `${serviceUri}`;
        var query = '';

        if (info.startOrder && info.startOrder !== "") {
          if (query === '') query = `startOrder=${info.startOrder}`;
          else query = `${query}&startOrder=${info.startOrder}`;
      }
      if (info.endOrder && info.endOrder !== "") {
          if (query === '') query = `endOrder=${info.endOrder}`;
          else query = `${query}&endOrder=${info.endOrder}`;
      }
      if (info.orderStatus && info.orderStatus !== "") {
          if (query === '') query = `orderStatus=${info.orderStatus}`;
          else query = `${query}&orderStatus=${info.orderStatus  }`;
      }
      if (info.totalOrderFrom && info.totalOrderFrom !== "") {
          if (query === '') query = `totalOrderFrom=${info.totalOrderFrom}`;
          else query = `${query}&totalOrderFrom=${info.totalOrderFrom}`;
      }
      if (info.totalOrderTo && info.totalOrderTo !== "") {
        if (query === '') query = `totalOrderTo=${info.totalOrderTo}`;
        else query = `${query}&totalOrderTo=${info.totalOrderTo}`;
    }
       
      
      if (query !== '')
          endpoint = `${serviceUri}?${query}`;
        return super.get(endpoint);
    }

    generateExcel(info) {
       
        var query = '';

        if (info.startOrder && info.startOrder !== "") {
          if (query === '') query = `startOrder=${info.startOrder}`;
          else query = `${query}&startOrder=${info.startOrder}`;
      }
      if (info.endOrder && info.endOrder !== "") {
          if (query === '') query = `endOrder=${info.endOrder}`;
          else query = `${query}&endOrder=${info.endOrder}`;
      }
      if (info.orderStatus && info.orderStatus !== "") {
          if (query === '') query = `orderStatus=${info.orderStatus}`;
          else query = `${query}&orderStatus=${info.orderStatus  }`;
      }
      if (info.totalOrderFrom && info.totalOrderFrom !== "") {
          if (query === '') query = `totalOrderFrom=${info.totalOrderFrom}`;
          else query = `${query}&totalOrderFrom=${info.totalOrderFrom}`;
      }
      if (info.totalOrderTo && info.totalOrderTo !== "") {
        if (query === '') query = `totalOrderTo=${info.totalOrderTo}`;
        else query = `${query}&totalOrderTo=${info.totalOrderTo}`;
    }
       
      
      if (query !== '')
        var endpoint = `${serviceUri}/download?${query}`;
          return super.getXls(endpoint);
    }
    
}
