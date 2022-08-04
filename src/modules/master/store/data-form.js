import { inject, bindable, computedFrom } from 'aurelia-framework';
var StorageLoader = require('../../../loader/storage-loader-for-store-loader');

export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable selectedStorage;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    salesCategories=["STAND ALONE","KONSINYASI","PENJUALAN UMUM","PENJUALAN VVIP"];
    statusOptions=["CLOSE","OPEN"];
    storeCategories=["BAZAAR","DEPT STORE","FACTORY OUTLET","KONSINYASI","MARKET PLACE","STAND ALONE"];
    onlineOfflineOptions=["ONLINE","OFFLINE"];
    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    storageView = (storage) => {
        return storage.name? `${storage.code} - ${storage.name}` :  `${storage.Code} - ${storage.Name}`
    }

    get storageLoader(){
        return StorageLoader;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if(this.data.code){
            this.selectedStorage={
                code: this.data.code,
                name: this.data.name
            }
        }
        this.data.longitude= this.data.longitude || 0;
        this.data.latitude= this.data.latitude || 0;
        this.data.salesTarget= this.data.salesTarget || 0;
        this.data.monthlyTotalCost= this.data.monthlyTotalCost || 0;
    }

    selectedStorageChanged(newValue){
        if(newValue){
            this.data.code=newValue.code;
            this.data.name=newValue.name;
        }
    }
} 
