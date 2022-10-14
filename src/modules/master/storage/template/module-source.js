import { inject, bindable, computedFrom } from 'aurelia-framework'
const ModuleLoader = require('../../../../loader/module-loader');

export class Detail {
    constructor() {
        
    }
    get moduleLoader() {
        return ModuleLoader;
    }
    
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.type = context.context.options.type;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit:this.isEdit,
        };
    }

}