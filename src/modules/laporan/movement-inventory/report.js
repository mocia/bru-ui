import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';

@inject(Router, Service)
export class Report {
    itemYears = [];
    usedMonth = {};
    usedYear = {};
    month;
    year;

    info = {
        page:1,
        size:25,
    };

    data = [];

    columns = [
        { 
            title: 'Kode Toko', valign: "middle", field: "StorageCode" 
        }, 
        { 
            title: 'Nama Toko',  valign: "middle", field: "StorageName" 
        }, 
        { 
            title: 'Kode Barang', valign: "middle", field: "ItemCode" 
        },
        {
            title: 'Nama Barang', valign: "middle", field: "ItemName" 
        },
        {
            title: 'RO', valign: "middle", field: "ItemArticleRealizationOrder" 
        },
        {
            title: 'Tipe', valign: "middle", field: "Type" 
        }, 
        {
            title: 'Sebelum', valign: "middle", field: "Before" 
        }, 
        {
            title: 'Kuantitas', valign: "middle", field: "Quantity" 
        }, 
        {
            title: 'Sesudah', valign: "middle", field: "After" 
        }
    ]

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    constructor(router, service) {
        this.router = router;
        this.service = service;

        this.itemMonths = [
            { text: 'January', value: 1 },
            { text: 'February', value: 2 },
            { text: 'March', value: 3 },
            { text: 'April', value: 4 },
            { text: 'May', value: 5 },
            { text: 'June', value: 6 },
            { text: 'July', value: 7 },
            { text: 'August', value: 8 },
            { text: 'September', value: 9 },
            { text: 'October', value: 10 },
            { text: 'November', value: 11 },
            { text: 'Desember', value: 12 }
        ];

        this.currentYear = moment().format('YYYY');
        for (var i = parseInt(this.currentYear); i >= 2017; i--) {
            this.itemYears.push(i.toString());
        }
    }

    async activate() {
        
    }

    showMovement() {

        this.data = [];

        let month = this.month;
        let year = this.year;

        var args = {
            page: this.info.page,
            size: this.info.size,
            month: month != null ? month.value : new Date().getMonth(),
            year: year != null ? year : new Date().getFullYear()
        }

        this.service.getMovement(args)
            .then(results => {

                var rowDate=[];
                var rowStorageDate=[];
                var rowItemStorageDate=[];

                this.info.total = results.info.total; 
                var index = 0;

                for(var a of results.data){
                    var d = new Date(a.Date);
                    a.Date = d.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
                }

                for(var a of results.data) {
                    var date = a.Date.toString();
                    var storageCode = a.StorageCode.toString();
                    var itemCode = a.ItemCode.toString();

                    if(!rowDate[date]){
                        index++;
                        a.count = index;
                        rowDate[date]=1;
                    }
                    else {
                        rowDate[date]++;
                    }

                    if(!rowStorageDate[date+storageCode]){
                        rowStorageDate[date+storageCode]=1;
                    }
                    else {
                        rowStorageDate[date+storageCode]+=1;
                    }

                    if(!rowItemStorageDate[date+storageCode+itemCode]){
                        rowItemStorageDate[date+storageCode+itemCode]=1;
                    }
                    else{
                        rowItemStorageDate[date+storageCode+itemCode]+=1;
                    }
                }

                for(var b of results.data) {

                    let date = results.data.find(o => o.Date == b.Date);

                        if(date){
                            date.datespan = rowDate[b.Date];
                        }

                    let storageCode = results.data.find(o => o.Date + o.StorageCode == b.Date + b.StorageCode);
                
                        if(date && storageCode){
                            storageCode.storagespan = rowStorageDate[b.Date+b.StorageCode];
                        }

                    let itemCode = results.data.find(o => o.Date + o.StorageCode + o.ItemCode == b.Date + b.StorageCode + b.ItemCode);
                    
                        if(date&&itemCode&&storageCode){
                            itemCode.itemspan = rowItemStorageDate[b.Date+b.StorageCode+b.ItemCode];
                        }

                    this.data.push(b);
                }

                this.usedMonth = month;
                this.usedYear = year;

            })
            .catch(e => {
                this.error = e;
            })
    }

    downloadMovementExcel() {
        var args = {
            month: this.month != null ? this.month.value : new Date().getMonth(),
            year: this.year != null ? this.year : new Date().getFullYear()
        }

        this.service.getMovementExcel(args);
    }

    changePage(e){
        var page = e.detail;
        this.info.page = page;

        this.showMovement();
    }
}
