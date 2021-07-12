$(function () {
    $.get('data/data.json', function (obj) {
        //==============CHART 1==============
        var categories = new Array();
        var label = new Array();
        var labelCategory = ["Agrowisata", "Wisata Alam", "Wisata Belanja", "Wisata Buatan", "Wisata Budaya", "Wisata Heritage", "Wisata Industri", "Wisata Konservasi", "Wisata Kuliner", "Wisata Pendidikan"];
        
        //Memasukkan value dari atribut category JSON ke dalam variabel label
        $.each(obj, function (n, data) {
            $.each(data, function (n, data1) {
                $.each(data1, function (n, data2) {
                    label.push(data2.category);
                });
            });
        });

        // console.log(label);

        var label1 = new Array();
        $.each(label, function (n, data) {
            // cek array apa bukan
            if (Array.isArray(data)) {
                //hapus duplicate
                var tes = new Array();
                $.each(data, function (i, el) {
                    if ($.inArray(el, tes) === -1) tes.push(el);
                });
                // push data
                $.each(tes, function (n, test) {
                    label1.push(test);
                });

            } else {
                label1.push(data);
            }
        });

        // console.log(label1); //1548

        //menghitung jumlah data setiap kategori
        var dictLabel = {};

        $.each(labelCategory, function (n, data) {
            var count = 0;
            $.each(label1, function (n, data1) {
                if (data1 == data) {
                    count++;
                }
            });
            dictLabel[data] = count;
        });

        // console.log(dictLabel);
        var seri = Object.values(dictLabel);

        Highcharts.chart('Chart1', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Total Wisata Berdasarkan Kategori'
            },
            subtitle: {
                text: 'Sumber : Wikipedia Indonesia'
            },
            xAxis: {
                categories: labelCategory,
            },
            yAxis: {
                title: {
                    text: 'Dalam satuan',
                    align: 'high'
                }
            },
            legend:{
                visible: false
            },
            credits: {
                enabled: false
            },
            series: [{
                name: "Total",
                showInLegend: false,
                data: seri,
                colorByPoint: true,
            },],
            exporting: {
                showTable: false,
                csv: {
                    columnHeaderFormatter: function(item, key) {
                        if (!item || item instanceof Highcharts.Axis) {
                            return 'Kategori';
                        } else {
                            return item.name;
                        }
                    }
                }
            }
        });

        //==============CHART 2==============
        var Prov = ['Bali', 'Banten', 'Jawa Barat', 'Jawa Timur', 'Jakarta', 'Jawa Tengah', 'Yogyakarta'];
        var dictProv = {};
        var ProvList = new Array();

        $.each(obj, function (n, data) {
            $.each(data, function (n, data1) {
                $.each(data1, function (n, data2) {
                    if (Array.isArray(data2.loc)) {
                        ProvList.push(data2.loc[0].prov);
                    } else {
                        ProvList.push(data2.loc.prov);
                    }
                });
            });
        });

        // console.log(ProvList);
        var ProvArr = new Array();
        var ProvArr2 = new Array();
        
        var i = 0;
        $.each(Prov, function (n, data) {
            var count = 0;
            
            $.each(ProvList, function (n, data1) {
                if (data1 == data) {
                    count++;
                }
            });
            ProvArr2[i] = count;
            ProvArr.push({
                name : data,
                y : count
            })
            i++;
        });

        // console.log(ProvArr2);
        // console.log(ProvArr);

        Highcharts.chart('Chart2', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Persentase Total Wisata Berdasarkan Wilayah'
            },
            subtitle: {
                text: 'Sumber : Wikipedia Indonesia'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Total',
                colorByPoint: true,
                data: ProvArr
            }],
            exporting: {
                showTable: false,
                csv: {
                    columnHeaderFormatter: function(item, key) {
                        if (!item || item instanceof Highcharts.Axis) {
                            return 'Wilayah';
                        } else {
                            return item.name;
                        }
                    }
                }
            }
        });

        //==============CHART 3==============
        var totalSkor = new Array();
        var dictTotalScore = {};

        $.each(obj, function (n, data) {
            $.each(data, function (n, data1) {
                $.each(data1, function (n, data2) {
                    if(data2.totalScore != undefined){
                        if(data2.totalScore != 0){
                            totalSkor.push(data2.totalScore);
                        }
                    }
                });
            });
        });

        // console.log(totalSkor);

        $.each(Prov, function(n, data){
            var total = 0;
            var count = 0;
            var average = 0;
            $.each(obj, function (n, data1) {
                $.each(data1, function (n, data2) {
                    $.each(data2, function (n, data3) {
                        if(data3.loc.prov == data){
                            if(data3.totalScore != undefined){
                                if(data3.totalScore != 0){
                                    total = total + data3.totalScore;
                                    count++;
                                }
                            }
                        }
                    });
                });
            });
            average = total/count;

            dictTotalScore[data] = parseFloat(average.toFixed(2));
        });

        var valueOfScore = Object.values(dictTotalScore);
        var keyOfScore = Object.keys(dictTotalScore);

        Highcharts.chart('Chart3', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Rerata Skor Wisata Berdasarkan Wilayah'
            },
            subtitle: {
                text: 'Sumber : Wikipedia Indonesia'
            },
            xAxis: {
                categories: keyOfScore,
                crosshair: true
            },
            yAxis: {
                min: 4,
                title: {
                    text: 'dalam desimal'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: "Rerata",
                showInLegend: false,
                data: valueOfScore,
                colorByPoint: true
                }],
            exporting: {
                showTable: false,
                csv: {
                    columnHeaderFormatter: function(item, key) {
                        if (!item || item instanceof Highcharts.Axis) {
                            return 'Wilayah';
                        } else {
                            return item.name;
                        }
                    }
                }
            }
        });
    });
});