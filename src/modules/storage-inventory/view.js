import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';

@inject(Router, Service)
export class View {
    
    // itemYears = [];
    data = [];
    info = { page: 1, keyword: '' };
    params = {};
    keyword = '';
    // month;
    // year;

    // itemName;
    // storageName;

    controlOptions = {
        control: {
            length: 4,
        },
    };

    constructor(router, service) {
        this.router = router;
        this.service = service;

        // this.itemMonths = [
        //     { text: 'January', value: 1 },
        //     { text: 'February', value: 2 },
        //     { text: 'March', value: 3 },
        //     { text: 'April', value: 4 },
        //     { text: 'May', value: 5 },
        //     { text: 'June', value: 6 },
        //     { text: 'July', value: 7 },
        //     { text: 'August', value: 8 },
        //     { text: 'September', value: 9 },
        //     { text: 'October', value: 10 },
        //     { text: 'November', value: 11 },
        //     { text: 'Desember', value: 12 }
        // ];

        // this.currentYear = moment().format('YYYY');
        // for (var i = parseInt(this.currentYear); i >= 2017; i--) {
        //     this.itemYears.push(i.toString());
        // }
    }

    // columns = [
    //     {title: 'No', field: 'Index'}, 
    //     {title: 'Tanggal', field: 'Date'}, 
    //     {title: 'Referensi', field: 'Reference'},
    //     {title: 'Tipe', field: 'Type'},
    //     {title: 'Sebelum', field: 'Before'},
    //     {title: 'Kuantitas', field: 'Quantity'},
    //     {title: 'Setelah', field: 'After'},
    //     {title: 'Deskripsi', field: 'Remark'}
    // ]

    async activate(params) {        
        this.params = params;
        this.info.keyword = '';

        var storageId = params.storageId;
        var itemCode = params.itemCode; 
        var result = await this.service.getAllMovement(storageId, itemCode, this.info);

        // var result = await this.service.getItem(this.params.itemCode,this.params.storageId);
        // this.itemName = result[0].item.name;
        // this.storageName = result[0].storage.name;

        console.log(result);

        this.data = result;
        this.info = result.info;
        var moment = require('moment');
        for (var obj of this.data) {
            obj.Date = moment(obj.Date, "YYYY-MM-DDTHH:mm:SSSZ").format("DD MMM YYYY - HH:mm:SS")
        }
    }

    loadPage() {

        var params = this.params;
        var keyword = this.info.keyword;

        var storageId = params.storageId;
        var itemCode = params.itemCode; 

        this.service.getAllMovement(storageId, itemCode, this.info)
            .then(result => {
                    this.data = result;
                    this.info = result.info;
                    var moment = require('moment');
                    for (var obj of this.data) {
                        obj.Date = moment(obj.Date, "YYYY-MM-DDTHH:mm:SSSZ").format("DD MMM YYYY - HH:mm:SS")
                    }
                })

        // var _month = this.month.value;
        // var _year = this.year;

        // this.service.getAllMovementByDate(storageId, itemCode, _month, _year, this.info)
        //     .then(result => {
        //         this.data = result;
        //         this.info = result.info;
        //         var moment = require('moment');
        //         for (var obj of this.data) {
        //             obj.Date = moment(obj.Date, "YYYY-MM-DDTHH:mm:SSSZ").format("DD MMM YYYY - HH:mm:SS")
        //         }
        //     })
        //     .catch(e =>{
        //         console.log(e);
        //     })
    }

    moveexcel(params) {
        var params = this.params;

        var storageId = params.storageId;
        var itemCode = params.itemCode; 

        this.service.movementExcel(storageId, itemCode);

        // var _month = this.month.value;
        // var _year = this.year;

        // this.service.movementExcelByDate(storageId, itemCode, _month, _year);
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    list() {
        this.router.navigateToRoute('list');
    }
}
