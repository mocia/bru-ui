import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async bind() {
        this.data = { items: [] };
        this.error = { items: [] };
        this.expeditionServices = await this.service.getExpeditionServices();
    }

    dataChanged(newValue, oldValue) {
    }

    activate(params) {

    }

    list() {
        this.router.navigateToRoute('list');
    }

    save() {
        let saveItems = this.data.items.filter(d => d.quantity != undefined);
        this.data.items = saveItems;
        
        //cek total weight
        for(let i = 0; i < this.data.items.length; i++){
            if(this.data.items[i].weight === 0){
                alert('Berat tidak boleh 0');
                return;
            }
            if(this.data.items[i].spkDocsViewModel.Weight==0){
                this.data.items[i].spkDocsViewModel.Weight=this.data.items[i].weight;
            }
            console.log(this.data.items[i].spkDocsViewModel.Weight)
        }
        
        this.service.create(this.data)
            .then(result => {
                this.list();
            })
            .catch(e => {
                alert('Terjadi Kesalahan.Cek Inputan yang belum diisi');
                 
                console.log(e);
                // for (var item of e.items) {
                //     for (var d of item.details) {
                //         this.error =d; 
                   
                //     }
                //    // this.error.spkDocuments[item].remark = e.spkDocuments[item].remark;
                // }
              
                // this.error = e;
                

            })
    }
}
