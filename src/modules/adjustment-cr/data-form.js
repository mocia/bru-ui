import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var SourceLoader = require('../../loader/nstorage-loader');

@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    Type = ["IN", "OUT"];
    hasFocus = true;
    

    controlOptions = {
        // label: {
        //     length: 4
        // },
        control: {
            length: 12
        }
    }

    auInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async attached() {
        this.sumTotalQty = 0;
        this.sumPrice = 0;
    }

    get sourceLoader() {
        return SourceLoader;
    }

    sourceChange(e) {
        this.data.items = [];
        if (this.data.storage && this.data.storage._id){
            this.data.storage = this.data.storage;
            console.log(this.data.storage);
        }
        else {
            this.data.storage = null;
        }   
    }

    get hasSource() {
        return this.data && this.data.storage != null && this.data.storage._id !== '';
    }

    async barcodeChoose(e) {
        var itemData = e.target.value.toString().trim();
        var source = this.data.storage._id;

        if (itemData && itemData.length >= 13) {
            let args = {
                itemData: itemData,
                source: source
            };

            var temp = await this.service.getByCode(args);

            if (temp != undefined) {
                if (Object.getOwnPropertyNames(temp).length > 0) {
                    var itemTemp = temp[0];
                    if (itemTemp != undefined) {
                        if(Object.getOwnPropertyNames(itemTemp).length > 0) {
                        var _data = this.data.items.find((item) => item.item.code === itemTemp.item.code);
                            if (!_data) {
                                var newItem = {};
                                var item = {}

                                item._id = itemTemp.item._id;
                                item.name = itemTemp.item.name;
                                item.code = itemTemp.item.code;
                                item.uom = itemTemp.item.uom;
                                item.size = itemTemp.item.size;
                                item.articleRealizationOrder = itemTemp.item.articleRealizationOrder;
                                item.domesticCOGS = parseFloat(itemTemp.item.domesticCOGS);
                                item.domesticSale = parseFloat(itemTemp.item.domesticSale);
                                item.domesticRetail = parseFloat(itemTemp.item.domesticRetail);
                                item.domesticWholesale = parseFloat(itemTemp.item.domesticWholesale);

                                newItem.item = item;
                                newItem.qtyBeforeAdjustment = itemTemp.quantity;
                                newItem.qtyAdjustment = 0;
                                newItem.remark = "";
                                newItem.type = "IN";                                

                                this.data.items.push(newItem);

                            } else {
                                alert("Barang sudah ada di list");
                            }
                        }
                    } else {

                        var tempMaster = await this.service.getMasterByCode(itemData);

                        if (tempMaster != undefined) {
                            if (Object.getOwnPropertyNames(tempMaster).length > 0) {
                                var itemMasterTemp = tempMaster[0];

                                console.log(itemMasterTemp);

                                if (itemMasterTemp != undefined) {
                                    if(Object.getOwnPropertyNames(itemMasterTemp).length > 0) {
                                        var _data = this.data.items.find((item) => item.item.code === itemMasterTemp.code);

                                        if (!_data) {
                                            var newItem = {};
                                            var item = {}
            
                                            item._id = itemMasterTemp._id;
                                            item.name = itemMasterTemp.name;
                                            item.code = itemMasterTemp.code;
                                            item.uom = itemMasterTemp.Uom;
                                            item.size = itemMasterTemp.Size;
                                            item.articleRealizationOrder = itemMasterTemp.ArticleRealizationOrder;
                                            item.domesticCOGS = itemMasterTemp.DomesticCOGS == null ? 0 : parseFloat(itemMasterTemp.DomesticCOGS);
                                            item.domesticSale = itemMasterTemp.DomesticSale == null ? 0 : parseFloat(itemMasterTemp.DomesticSale);
                                            item.domesticRetail = itemMasterTemp.DomesticRetail == null ? 0 : parseFloat(itemMasterTemp.DomesticRetail);
                                            item.domesticWholesale = itemMasterTemp.DomesticWholesale == null ? 0 : parseFloat(itemMasterTemp.DomesticWholesale);
            
                                            newItem.item = item;
                                            newItem.qtyBeforeAdjustment = 0;
                                            newItem.qtyAdjustment = 0;
                                            newItem.remark = "";
                                            newItem.type = "IN";                                
            
                                            this.data.items.push(newItem);
            
                                        } else {
                                            alert("Barang sudah ada di list");
                                        }
                                    }
                                }
                            }
                        } else {
                            alert("Barang tidak ada di data master");
                        }
                    }
                }
            }
            else {
                alert("Barang tidak ditemukan");
            }
            this.barcode = "";
        }
    }    

    // async nameChoose(e) {
    //     this.hasFocus = false;
    //     var itemData = e.detail;
    //     if (itemData && itemData.code && itemData.code !== "") {
    //         if (Object.getOwnPropertyNames(itemData).length > 0) {
    //             var newItem = {};
    //             var _data = this.data.items.find((item) => item.code === itemData.code);
    //             if (!_data) {
    //                 this.qtyFg = 0;
    //                 this.price = 0;
    //                 newItem.itemId = itemData._id;
    //                 newItem.availableQuantity = 0;
    //                 var result = await this.service.getDataInventory(this.data.source._id, newItem.itemId);
    //                 if (result != undefined) {
    //                     newItem.availableQuantity = result.quantity;
    //                 }
    //                 newItem.name = itemData.name;
    //                 newItem.code = itemData.code;
    //                 newItem.quantity = 1;
    //                 this.qtyFg = this.qtyFg + 1;
    //                 this.price = itemData.domesticSale;
    //                 newItem.price = parseFloat(itemData.domesticSale);
    //                 newItem.remark = "";
    //                 this.data.items.push(newItem);
    //             }
    //             this.item = null;
    //         }
    //     }
    // }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
        this.error = null;
    }

    // typeChanged(item) {

    //     var itemIndex = this.data.items.indexOf(item);
    //     this.data.items[itemIndex].type == item.type;            

    //     this.qtyChanged(this.data.items[itemIndex].code, this.data.items[itemIndex].qtyAdjustment);
    // }

    // qtyChanged(code, qty) {
    
    //     var _data = this.data.items.find((item) => item.item.code === code);
    //     if(_data) {
    //         if(_data.type == "IN"){
    //             _data.qty = _data.qtyBeforeAdjustment + qty;
    //         } else {
    //             _data.qty = _data.qtyBeforeAdjustment - qty;
    //         }
    //     }    
    // }
}
