document.addEventListener('DOMContentLoaded', function(){
    /*
    var detailNotice = Toastify({
        text: notice,
        position: "center",
        gravity: "bottom",
        duration: -1,
        close: true
    })

    var shrotNotice = Toastify({
        text: "공지사항(클릭)　　　　　닫기 >>> ",
        position: "center",
        gravity: "bottom",
        duration: -1,
        close: true,
        onClick: function(){
            shrotNotice.hideToast();
            detailNotice.showToast();
        }
    }).showToast();
    */

    $('#color-picker').spectrum({
        preferredFormat: "hex",
        showAlpha: false,
        color: '#00ff00',
        hideAfterPaletteSelect: true,
        palette: [
            ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
            ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
            ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
            ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
            ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
            ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
            ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
            ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
        ]
    });

    $('.sp-colorize').on("click", function(){
        $('#color-picker').spectrum("toggle");
        return false;
    });
    
    $('#wideview').on("click", function(){
        if($(this).text() == '넓게보기'){
            $('#chartdiv').parent().css('position','relative');
            $('#chartdiv').parent().css('zIndex','998');
            $('#chartdiv').parent().css('width','100vw');
            $('#chartdiv').parent().css('margin-left','calc(-50vw + 50%)');
            $(this).text('되돌리기')
        }else{
            $('#chartdiv').parent().css('position','');
            $('#chartdiv').parent().css('zIndex','');
            $('#chartdiv').parent().css('width','100%');
            $('#chartdiv').parent().css('margin-left','');
            $(this).text('넓게보기')
        }   
    });

    $('#reset').on("click", function(){
        delCookie('indata');
        location.reload();
    });

    $.ajax({
        type: 'POST',
        url: url + '/chart_itemlist',
        success:function(json) {
            db_time = String(json['db_refresh_time']);

            for (var i = 0; i < json['items'].length; i++) {
                $('.itemList .dropdown-menu').append('<li><a class="dropdown-item" href="javascript:void(0);">' + json['items'][i] + '</a></li>');
                $('#itemUl').append('<li><a class="dropdown-item" href="javascript:void(0);">' + json['items'][i] + '</a></li>');
            }

            am5.ready(function() {
                if(!(getCookie('indata') == ""  || getCookie('indata') == undefined)){
                    var cookietoast = Toastify({
                        text: "최근 추가한 아이템(들) 불러오는 중...",
                        position: "center",
                        gravity: "bottom",
                        duration: -1,
                        close: false
                    }).showToast();
                }
                // Create root element
                // https://www.amcharts.com/docs/v5/getting-started/#Root_element 
                var root = am5.Root.new("chartdiv");
                root.locale = am5locales_ko_KR;
        
                // Set themes
                // https://www.amcharts.com/docs/v5/concepts/themes/ 
                root.setThemes([
                    am5themes_Animated.new(root)
                ]);
        
                // Create chart
                // https://www.amcharts.com/docs/v5/charts/xy-chart/
                var chart = root.container.children.push(am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    maxTooltipDistance: 0,
                    background: am5.Rectangle.new(root, {
                        fill: root.interfaceColors.get("alternativeBackground"),
                        fillOpacity: 1
                    })
                }));
        
                // Create axes  
                // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
                var xAxis = chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
                    groupData: true,
                    maxDeviation: 0.2,
                    baseInterval: {
                        timeUnit: "minute",
                        count: 5
                    },
                    renderer: am5xy.AxisRendererX.new(root, {})
                    //, tooltip: am5.Tooltip.new(root,{})
                }));
                var xRenderer = xAxis.get("renderer");
                xRenderer.labels.template.setAll({
                    fill: am5.color(0xffffff),
                    fillOpacity: 0.5
                });
                xRenderer.grid.template.setAll({
                    stroke: am5.color(0xffffff)
                });
        
                var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererY.new(root, {})
                }));
                var yRenderer = yAxis.get("renderer");
                yRenderer.labels.template.setAll({
                    fill: am5.color(0xffffff),
                    fillOpacity: 0.5
                });
                yRenderer.grid.template.setAll({
                    stroke: am5.color(0xffffff)
                });
        
                // Add cursor
                // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
                var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
                    behavior: "none"
                }));
                cursor.lineX.setAll({
                    stroke: am5.color(0xffffff)
                });
                cursor.lineY.setAll({
                    stroke: am5.color(0xffffff)
                });
        
                // Add scrollbar
                // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
                chart.set("scrollbarX", am5.Scrollbar.new(root, {
                    orientation: "horizontal"
                }));
        
                // Add legend
                // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
                var legend = chart.rightAxesContainer.children.push(am5.Legend.new(root, {
                    // width: 335,
                    // paddingBottom: 30
                }));

                
                chart.events.on('boundschanged', () => {
                    if (window.innerWidth < 992) {
                        chart.topAxesContainer.children.moveValue(legend, 0);
                        legend.setAll({
                            x: 0,
                            y: 50,
                            width: 0,
                            centerX: 0,
                            paddingBottom: 50
                        });
                    }else{
                        chart.rightAxesContainer.children.moveValue(legend, 0);
                        legend.setAll({
                            x: 0,
                            y: 0,
                            width: 335,
                            height: 0,
                            paddingLeft: 15,
                            paddingBottom: 50
                        });
                    }
                });
        
                var legendTool = chart.plotContainer.children.push(am5.Legend.new(root, {
                }));

                legend.itemContainers.template.set("width", am5.p100);
                legend.valueLabels.template.setAll({
                    textAlign: "left"
                });

                legend.itemContainers.template.events.on("click", function(e) {
                    var itemContainer = e.target;
                    var series = itemContainer.dataItem.dataContext;
                    var seriesopacity =  series.strokes.template._settings.strokeOpacity;
                    if(seriesopacity == undefined || seriesopacity == 1){
                        series.strokes.template.setAll({
                            strokeOpacity: 0
                        });
                    }else{
                        series.strokes.template.setAll({
                            strokeOpacity: 1
                        });
                    }
                });
                
                db_year = db_time.slice(0,4);
                db_mon = db_time.slice(4,6);
                db_day = db_time.slice(6,8);
                db_hour = db_time.slice(8,10);
                db_min = db_time.slice(10,12);
                chart.children.unshift(am5.Label.new(root, {
                    text: "서버 데이터 갱신 시간 : " + db_year + "-" + db_mon + "-" + db_day + " " + db_hour + ":" + db_min,
                    fontSize: 15,
                    x: 55,
                    y: am5.percent(99),
                    fill: am5.color(0xffffff)
                }));
                
                function generateChartData(data) {
                    chartData = [];
                    for (var i = 0; i < data.length; i++) {
                        tempdict = {}
                        for (var j = 1; j < data[i].length; j++) {
                            if(data[i][j] == null){
                                continue;
                            }
                            if(Object.keys(tempdict).length == 0){
                                var time = String(data[i][0]);
                                year = time.slice(0,4);
                                month = Number(time.slice(4,6))-1;
                                day = time.slice(6,8);
                                hour = time.slice(8,10);
                                minute = time.slice(10,12);
                                var newDate = new Date(year, month, day, hour, minute).getTime();
                                tempdict['date'] = newDate;
                            }
                            tempdict[j] = data[i][j];
                        }
                        if(Object.keys(tempdict).length != 0){
                            chartData.push(tempdict);
                        }
                    }
                }
                //SmoothedXLineSeries
                //LineSeries
                function makeSeries(name, field){
                    name = name.replace("null,", "");
                    var series = chart.series.push(am5xy.LineSeries.new(root, {
                        name: name.trim().replace("[","[[").replace("]","]]"),
                        xAxis: xAxis,
                        yAxis: yAxis,
                        valueYField: field,
                        valueXField: "date",
                        locationX: 0,
                        connect: false,
                        legendLabelText: "[{fill}]{name}[/]",
                        legendValueText: "[bold {fill}]{valueY}[/]",
                        tooltip: am5.Tooltip.new(root, {
                            pointerOrientation: "horizontal",
                            labelText: "[[{valueX.formatDate('yy-MM-dd')}({valueX.formatDate('EEE')}) {valueX.formatDate('HH:mm')}]]\n{name} : [bold]{valueY}[/]"
                        })
                    }));

                    series.strokes.template.setAll({
                        strokeWidth: 3
                    });

                    series.data.setAll(chartData);
                    legend.data.push(series);
                }

                function makeToolSeries(name, field, color, width, line){
                    var name = name.replace("null,", "");
                    var series;
                    var dashharry;
                    seriesDict = {
                        name: name.trim(),
                        xAxis: xAxis,
                        yAxis: yAxis,
                        valueYField: field,
                        valueXField: "date",
                        stroke: am5.color(color),
                        fill: am5.color(color),
                        locationX: 0,
                        connect: false,
                        legendLabelText: "[{fill}]{name}[/]",
                        legendValueText: "[bold {fill}]{valueY}[/]"
                    }

                    series = chart.series.push(am5xy.LineSeries.new(root, seriesDict));
                    if(line == "곡선 그래프"){
                        series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, seriesDict));
                    }else if(line == "점선 그래프"){
                        series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, seriesDict));
                        dashharry = [width, width];
                    }
                    
                    series.strokes.template.setAll({
                        strokeDasharray: dashharry,
                        strokeWidth: width

                    });
                    
                    series.strokes.template.setAll({
                        strokeWidth: width
                    });

                    series.data.setAll(toolData);
                    legendTool.data.push(series);
                }

                $(".itemList .dropdown-toggle").on("click", function(){
                    setTimeout(function(){ 
                        $("#myInput").focus(); 
                    }, 50);
                });

                $(".itemList li #myInput").on("keyup", function() {
                    var value = $(this).val().toLowerCase();
                    $(".itemList .dropdown-menu li").filter(function() {
                        if($(this).children().prop('tagName') == 'INPUT'){
                            return;
                        }
                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                    });
                });

                var indata = [];
                $(".itemList .dropdown-menu li").filter(function() {
                    if($(this).children().prop('tagName') == 'INPUT'){
                        return;
                    }
                    $(this).on("click", function(){
                        $("#myInput").val("");
                        $(".itemList .dropdown-menu li").css('display', '');
                        $(".itemList .dropdown-menu").scrollTop(0);
                        
                        if(!(indata.includes($(this).text()))){
                            var toast = Toastify({
                                text: $(this).text() + " 불러오는 중...",
                                position: "center",
                                gravity: "bottom",
                                duration: -1,
                                close: false
                            }).showToast();

                            $.ajax({
                                type: 'POST',
                                url: url + '/tickchart_data',
                                data:{'item':$(this).text()},
                                success:function(json) {
                                    
                                    generateChartData(json['data']);
                                    makeSeries(json['item'], 1);

                                    indata.push(json['item'].replace("null,","").trim());
                                    setCookie('indata', indata, 365);

                                    toast.hideToast();
                                }
                            });
                        } else {
                            for (var i = 0; i < chart.series.values.length; i++) {
                                if(chart.series.values[i]._settings['name'] == $(this).text().trim().replace("[","[[").replace("]","]]")) {
                                    chart.series.removeIndex(i);
                                    legend.data.setAll(chart.series.values);
                                    
                                    chart.yAxes.push(am5xy.ValueAxis.new(root, {
                                        renderer: am5xy.AxisRendererY.new(root, {})
                                    }));

                                    for (var i = 0; i < indata.length; i++) {
                                        if(indata[i] == $(this).text()){
                                            indata.splice(i, 1);
                                            break;
                                        }
                                    }
                                    setCookie('indata', indata, 30);
                                }                   
                            }
                        }
                    });
                });

                $('.chartTools #maBtn').on("click", function(){
                    var dropdownMenu = $('#MA #seriesUl');
                    $('#MA #seriesUl li').remove();
                    $('#MA #series').text('선택');
                    $('#MA #length').val("2");
                    $('#MA #width').val("1");
                    for (var i = 0; i < indata.length; i++) {
                        dropdownMenu.append('<li><a class="dropdown-item" href="javascript:void(0);">' + indata[i].trim() + '</a></li>');
                    }

                    $("#MA li").filter(function() {
                        $(this).on("click", function(){
                            $(this).parent().parent().find(".btn").text($(this).text());
                        });
                    });
                });

                $("#MA #make").on("click", function(e){
                    var targetSeries = $('#MA #series').text().replace("[","[[").replace("]","]]");
                    if(targetSeries == "선택"){
                        alert('대상을 선택하세요');
                        return;
                    }
                    var maLength = $('#MA #length').val();
                    if(301 > maLength < 1 ){
                        alert('단위 최솟값은 2 이상, 최댓값은 300 이하입니다.');
                        $('#MA #length').val("2");
                        return;
                    }
                    var maWidth = $('#MA #width').val();
                    if(maWidth <= 0){
                        alert('굵기 최솟값은 1 이상입니다.');
                        $('#MA #width').val("1");
                        return;
                    }
                    var maColor = $('#MA #color-picker').val();
                    if(maColor.length < 7){
                        alert('선 색깔을 다시 확인해주세요.');
                        return;
                    }
                    var seriesLine = $('#MA #line').text();

                    series = chart.children._container.series;
                    tempValueArray = [];
                    toolData = [];
                    
                    if(series.length == 1){
                        chartValueYField = series._values[0]._settings.valueYField;
                        values = series._values[0]._data._values;

                    }else {
                        for (var i = 0; i < series.length; i++) {
                            if(series._values[i]._settings.name == targetSeries){
                                chartValueYField = series._values[i]._settings.valueYField;
                                values = series._values[i]._data._values;
                                break;
                            }
                        }
                    }

                    for (var i = 0; i < values.length; i++) {
                        tempValueArray.push(values[i][chartValueYField]);
                        if(i+1 >= maLength){
                            maDate = values[i]['date'];
                            maValue = tempValueArray.reduce((a,b) => (a+b)) / maLength;
                            toolData.push({maField : maValue, date : maDate});
                            tempValueArray.shift();
                        }
                    }
                    makeToolSeries(String(maLength)+"MA"+"("+ targetSeries +")", "maField", maColor, maWidth, seriesLine);

                    $("#MA").modal('hide');
                });
            
                if(!(getCookie('indata') == ""  || getCookie('indata') == undefined)){
                    cookiestr = getCookie('indata');
                    $.ajax({
                        type: 'POST',
                        url: url + '/tickchart_data',
                        data:{'item':cookiestr},
                        success:function(json) {
                            try{
                                jsonarray = json.item.split(",");
                            } catch{
                                return;
                            }

                            generateChartData(json.data);

                            for (var i = 1; i < jsonarray.length; i++) {
                                makeSeries(jsonarray[i], i);
                            }

                            cookietoast.hideToast();
                        }
                    });
                }

                // Make stuff animate on load
                // https://www.amcharts.com/docs/v5/concepts/animations/
                chart.appear(1000, 100);
            });
        }
    });
});