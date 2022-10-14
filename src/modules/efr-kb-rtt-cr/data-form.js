import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var ItemLoader = require('../../loader/finished-goods-loader');

@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    @bindable source;
    @bindable item;

    manual = true;
    dataSource = {};
    sources = [];
    destinations = [];
    item;
    barcode;
    qtyFg;
    price;
    firstPrice = 0;
    indexSource = 0;
    hasFocus = true;

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
    }
    sumTotalQty;
    sumPrice;

    get itemLoader() {
      return ItemLoader;
    }

    itemView = (item) => {
      if (!item.Code)
        return `${item.code} - ${item.name}`
      else
        return `${item.Code} - ${item.Name}`
    }

    itemChanged(newValue, oldValue) {
      var selectedSupplier = newValue;

      console.log(selectedSupplier);
      
      if (selectedSupplier) {
        var _data = this.data.items.find((item) => item.item.code === selectedSupplier.code);

        if (!_data) {
          //this.sumTotalQty = 0;
          //this.sumPrice = 0;
          let args = {
            source: this.data.source._id,
            itemData: selectedSupplier.name,
          };
          this.service.getByName(args).then(result => {
            console.log(result);
            if (result.length > 0) {
              for (var datas of result) {

                this.data.items.push({
                  item: datas.item,
                  itemInternationalCOGS: datas.itemInternationalCOGS,
                  itemInternationalRetail: datas.itemInternationalRetail,
                  itemInternationalSale: datas.itemInternationalSale,
                  itemInternationalWholeSale: datas.itemInternationalWholeSale,
                  quantity: datas.quantity > 0? 1:0,
                  availablequantity: datas.quantity
                })

                this.sumTotalQty = this.sumTotalQty +  parseInt(datas.quantity>0? 1 : 0);
                this.sumPrice += datas.item.domesticSale * (datas.quantity>0? 1 : 0);
              }
              
            } else {
              alert("Stock Inventory Kosong")
            }
          })
        } else {
          this.sumTotalQty = this.sumTotalQty + parseInt(_data.quantity)
          this.sumPrice += _data.item.domesticSale * (_data.quantity);
          _data.quantity++;
        }
      } else {
        this.item="";
        //this.data.supplier = {};
        //this.data.supplierId = undefined;
      }

      this.makeTotal(this.data.items);
    }

    async attached() {
        // this.sumTotalQty = 0;
        // this.sumPrice = 0;  
        // var storages = await this.service.getModuleConfig();
        // var result = await this.getStorage(storages[0].config);

        // this.sources = result.splice(0, this.indexSource);
        // this.destinations = result.splice(0);
        // this.sources = this.sources.map(source => {
        //     source.toString = function () {
        //         return this.name;
        //     }
        //     return source;
        // })
        // this.destinations = this.destinations.map(destination => {
        //     destination.toString = function () {
        //         return this.name;
        //     }
        //     return destination;
        // })
        if (this.data.items != undefined) {
          this.makeTotal(this.data.items);
        } else {
          this.sumTotalQty = 0;
          this.sumPrice = 0;
        }
        var storages = await this.service.getModuleConfig()

        this.service.getDestinations()
          .then(result => {
            this.destinations = result.data;
            this.destinations.forEach((s) => {
              s.toString = function () {
                return s.name;
              }
            });
          })

        this.service.getSources()
          .then(result => {
            this.sources = result.data;
            this.sources.forEach((s) => {
              s.toString = function () {
                return s.name;
              }
            });
          })

        this.destinations = this.destinations.map(destination => {
          destination.toString = function () {
            return name;
          }
          return destination;
        })

        this.sources = this.sources.map(source => {
          source.toString = function () {
            return name;
          }
          return source;
        })

        //  this.service.getExpeditionServices().then(result => {
        //    this.expeditionServices = result;
        //  })
    }

    async barcodeChoose(e) {
      var newValue = e.target.value;
      if (newValue && newValue.length >= 13) {
        let args = {
         itemData: newValue.toString().trim(),
         source: this.data.source._id,
        };
        
        this.service.getByCode(args).then(result => {
          if (result.length > 0) {
            for (var datas of result) {
              var _data = this.data.items.find((item) => item.item.code === datas.item.code);
              if(!_data) {
                this.data.items.push({
                  item: datas.item,
                  itemInternationalCOGS: datas.itemInternationalCOGS,
                  itemInternationalRetail: datas.itemInternationalRetail,
                  itemInternationalSale: datas.itemInternationalSale,
                  itemInternationalWholeSale: datas.itemInternationalWholeSale,
                  quantity: datas.quantity > 0 ? 1 : 0,
                  availablequantity: datas.quantity
                })
                
                this.sumTotalQty = this.sumTotalQty + parseInt(datas.quantity>0? 1 : 0);
                this.sumPrice += datas.item.domesticSale * (datas.quantity>0? 1 : 0);

              } else {
                _data.quantity++;
                this.sumTotalQty = this.sumTotalQty + parseInt(datas.quantity>0? 1 : 0);
                this.sumPrice += _data.item.domesticSale * (datas.quantity>0? 1 : 0);
              }
            }
          } 
          else {
            alert("Stock Inventory Kosong")
          }
        })

        this.barcode="";
        this.makeTotal(this.data.items);
      }
    }

    async barcodeManual(){
      var newValue = this.barcode;
      let args = {
        itemData: newValue.toString().trim(),
        source: this.data.source._id,
      };
        
      this.service.getByCode(args).then(result => {
        if (result.length > 0) {
          for (var datas of result) {
            var _data = this.data.items.find((item) => item.item.code === datas.item.code);
            if(!_data) {
              this.data.items.push({
                item: datas.item,
                itemInternationalCOGS: datas.itemInternationalCOGS,
                itemInternationalRetail: datas.itemInternationalRetail,
                itemInternationalSale: datas.itemInternationalSale,
                itemInternationalWholeSale: datas.itemInternationalWholeSale,
                quantity: datas.quantity > 0 ? 1 : 0,
                availablequantity: datas.quantity
              })
                
              this.sumTotalQty = this.sumTotalQty + parseInt(datas.quantity>0? 1 : 0);
              this.sumPrice += datas.item.domesticSale * (datas.quantity>0? 1 : 0);

            } else {
              _data.quantity++;
              this.sumTotalQty = this.sumTotalQty + parseInt(datas.quantity>0? 1 : 0);
              this.sumPrice += _data.item.domesticSale * (datas.quantity>0? 1 : 0);
            }
          }
          this.barcode = "";
        } else {
          alert("Stock Inventory Kosong")
        }
      })

      this.makeTotal(this.data.items);
    }

    async qtyChange(code, qty) {
        var barcode = code;
        var quantity = qty;
        if (quantity != undefined) {
          var _data = this.data.items.find((item) => item.item.code === barcode);
          if (_data) {
            _data.quantity = parseFloat(quantity);
          }
        }
        this.makeTotal(this.data.items);
    }

    makeTotal(items) {
      this.sumTotalQty = 0;
      this.sumPrice = 0;
      if (Object.getOwnPropertyNames(items).length > 0) {
        for (var i = 0; i < items.length; i++) {
          this.sumTotalQty = this.sumTotalQty + parseInt(items[i].quantity);
          this.sumPrice += parseInt(items[i].quantity) * items[i].item.domesticSale;
        }
      }
    }

    removeItem(item) {
      var itemIndex = this.data.items.indexOf(item);
      this.data.items.splice(itemIndex, 1);
      this.makeTotal(this.data.items);
    }
}


