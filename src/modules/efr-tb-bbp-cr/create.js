import {inject, Lazy,bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';



@inject(Router, Service)
export class Create {
    @bindable  id =0;
    constructor(router, service) {
        this.router = router;
        this.service = service; 
        this.data = { items: [] };
        this.packingList = "";
    }
 
    activate(params) {
        if(params.id!=undefined){
            
            this.service.getPendingSPKById(params.id)
            
            .then(data => {
                    this.data = data;
                    data.reference = data.packingList;
                    this.id=  data._id;
                    data._id = undefined
                    for (var i of data.items){
                      i._id = 0;
                    }
                    //data.uid = new ObjectId().toString();
                })
            //console.log(this.data)
            .catch()
            console.log(this.data);
            
        }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    save() { 
        this.service.create(this.data)
            .then(result => {
                this.list();
            })
            .catch(e => {
                this.error = e;
            })
    } 

    exportToExcel() {
        this.service.generateExcel(this.id);
    }
}
