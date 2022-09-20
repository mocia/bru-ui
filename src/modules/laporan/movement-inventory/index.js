export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', '/report'], moduleId: './report', name: 'report', nav: false, title: 'Laporan Mutasi Barang Per Bulan' }
        ]);
        this.router = router;
    }
}