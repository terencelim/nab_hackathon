$(function() {

    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            month: '2015 Q1',
            Cappucinno: 2666,
            Latte: null,
            Mocha: 2647
        }, {
            month: '2015 Q2',
            Cappucinno: 2778,
            Latte: 2294,
            Mocha: 2441
        }, {
            month: '2015 Q3',
            Cappucinno: 4912,
            Latte: 1969,
            Mocha: 2501
        }],
        xkey: 'month',
        ykeys: ['Cappucinno', 'Latte', 'Mocha'],
        labels: ['Cappucinno', 'Latte', 'Mocha'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Download Sales",
            value: 12
        }, {
            label: "In-Store Sales",
            value: 30
        }, {
            label: "Mail-Order Sales",
            value: 20
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: '2006',
            a: 100,
            b: 90
        }, {
            y: '2007',
            a: 75,
            b: 65
        }, {
            y: '2008',
            a: 50,
            b: 40
        }, {
            y: '2009',
            a: 75,
            b: 65
        }, {
            y: '2010',
            a: 50,
            b: 40
        }, {
            y: '2011',
            a: 75,
            b: 65
        }, {
            y: '2012',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        hideHover: 'auto',
        resize: true
    });

});
