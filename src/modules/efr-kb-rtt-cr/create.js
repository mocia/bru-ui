import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Create {

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = { items: [] };
    }

    activate(params) {

    }

    list() {
        this.router.navigateToRoute('list');
    }

    save() {
        this.data.destinationId = this.data.destination._id;
        this.data.sourceId = this.data.source._id;
        var canSave=false;
        for(var item of this.data.items)
        {
            if(item.availablequantity===0)
            {
                canSave = false;
            }
            else
            {
                canSave = true;
            }
        }
        if(canSave)
        {
            this.service.create(this.data)
            .then(result => {
                this.list();
            })
            .catch(e => {
                this.error = e;
            })
        }else
        {
            alert('Data tidak bisa disimpan.Quantity 0. Silahkan dicek kembali');
        }
    }
}