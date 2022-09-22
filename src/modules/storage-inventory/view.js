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
    

    controlOptions = {
        control: {
            length: 4,
        },
    };

    constructor(router, service) {
        this.router = router;
        this.service = service;  
    }

    columns = [
        {title: 'No', field: 'Index'}, 
        {title: 'Tanggal', field: 'Date',
        }, 
        {title: 'Referensi', field: 'Reference'},
        {title: 'Tipe', field: 'Type'},
        {title: 'Sebelum', field: 'Before'},
        {title: 'Kuantitas', field: 'Quantity'},
        {title: 'Setelah', field: 'After'},
        {title: 'Deskripsi', field: 'Remark'}
    ]

    async activate(params) {        
        this.params = params;
        this.info.keyword = '';

        this.storageId = params.storageId;
        this.itemCode = params.itemCode; 
        
        
        this.reloadItem();
    }

    
    reloadItem() { 
        this.tableData=[];
        this.total=0;
        this.totalharga=0;
        //this.storageId= this.storage ? this.storage._id : "";
        this.filter = this.filter;
        var index=1;
        this.service.getAllMovement(this.storageId, this.itemCode, this.info)
            .then(data => {

                this.models.refresh();
                this.data = data;
                for (var item of this.data)
                {
                    item.Index=index++;
                    item.Date = moment(item.Date, "YYYY-MM-DDTHH:mm:SSSZ").format("DD MMM YYYY - HH:mm:SS")
                    this.tableData.push(item);
                    
                }
            })
    }

    moveexcel(params) {
        var params = this.params;

        var storageId = params.storageId;
        var itemCode = params.itemCode; 

        this.service.movementExcel(storageId, itemCode);

        
    }
    options = {
        search: false,
        showToggle: false,
        showColumns: false,
        undefinedText: '0'
    };
    
    list() {
        this.router.navigateToRoute('list');
    }
}
