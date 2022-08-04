export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Penyesuaian Stok'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Penyesuaian Stok'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Penyesuaian Stok'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Penyesuaian Stok'}
    ]);

    this.router = router;
  }
}