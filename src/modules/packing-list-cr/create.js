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

        let error = {
            items : []
        }
        for(let i = 0; i < this.data.items.length; i++){
            let d = this.data.items[i];
            var errObj ={}
            if(d.quantity < d.sendquantity){
                errObj.quantity= 'Jumlah barang yang dikirim tidak boleh lebih besar dari jumlah stok';
                error.items.push(errObj);
            }
            else if(d.quantity == 0){
                errObj.quantity= 'Jumlah barang yang dikirim harus lebih besar dari 0';
                error.items.push(errObj);
            }
            console.log(error.items, d)
        }

        if(error.items.length > 0){
            this.error = error;
            error = {
                items : []
            }
        }else{
            this.service.create(this.data)
                .then(result => {
                    this.list();
                })
                .catch(e => {
                    this.error = e;
                })   
        }
    }
    saveDraft() {
        this.data.destinationId = this.data.destination._id;
        this.data.sourceId = this.data.source._id;
        this.service.createDraft(this.data)
            .then(result => {
                this.list();
            })
            .catch(e => {
                this.error = e;
            })
    }
}
