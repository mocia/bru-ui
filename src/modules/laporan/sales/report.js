import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const StorageLoader = require('../../../loader/nstorage-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    info = {
        page:1,
        size:25,
    };

    bind(context) {
        this.context = context;
    }
    
    searching() {
       
        var info = {
            storage : this.storage ? this.storage._id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.getSales(info)
            .then(result => {
                this.data=[];
                console.log(result);
                this.info.total = result.info.total; 
                for(var _data of result.data){
                    _data.Date =  moment(_data.Date).format("YYYY-MM-DD");
                    this.data.push(_data);

                 }
            });
    }
    
    ExportToExcel() {
        var info = {
            storage : this.storage ? this.storage._id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
      
        }
        this.service.getSalesExcel(info);
    }

    get storageLoader(){
        return StorageLoader;
    }
    storageView = (storage) => {
        return `${storage}`;
    
    }
    
    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.storage = "";
        this.data = null;
        this.info.total=0;
    }
    changePage(e){
        var page = e.detail;
        this.info.page = page;

        this.showMovement();
    }
    
    showMovement() {

        this.data = [];
 
        var args = {
            page: this.info.page,
            size: this.info.size,
            storage : this.storage ? this.storage._id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        } 
        this.service.getSales(args)
        .then(result => {
            this.data=[];
            for(var _data of result.data){
                _data.Date =  moment(_data.Date).format("YYYY-MM-DD");
                this.data.push(_data);
             }
            })
            .catch(e => {
                this.error = e;
            })
        }
}
        