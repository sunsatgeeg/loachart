document.addEventListener('DOMContentLoaded', function(){
  $('#candlewideview').on("click", function(){
      if($(this).text() == '넓게보기'){
          $('#candlechartdiv').parent().css('zIndex','998');
          $('#candlechartdiv').parent().css('width','100vw');
          $('#candlechartdiv').parent().css('margin-left','calc(-50vw + 50%)');
          $(this).text('되돌리기')
      }else{
          $('#candlechartdiv').parent().css('zIndex','0');
          $('#candlechartdiv').parent().css('width','100%');
          $('#candlechartdiv').parent().css('margin-left','');
          $(this).text('넓게보기')
      }   
  });

  $('.candleChartTools #candlemaBtn').on("click", function(){
    var dropdownMenu = $('#candleMA #candleseriesUl');
    $('#candleMA #candleseries').text('선택');
    $('#candleMA #candlelength').val("2");
    $('#candleMA #candlewidth').val("1");

    $("#candleMA li").filter(function() {
      $(this).on("click", function(){
          $(this).parent().parent().find(".btn").text($(this).text());
      });
    });
  });

  $('#candle-color-picker').spectrum({
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
  $('#candleMA .sp-colorize').on("click", function(){
    $('#candle-color-picker').spectrum("toggle");
    return false;
  });

  $(".candleitemList .dropdown-toggle").on("click", function(){
    setTimeout(function(){ 
        $("#candlemyInput").focus(); 
    }, 50);
  });
  $(".candleitemList li #candlemyInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".candleitemList .dropdown-menu li").filter(function() {
        if($(this).children().prop('tagName') == 'INPUT'){
          return;
        }
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  am5.ready(function() {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("candlechartdiv");
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
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout,
      background: am5.Rectangle.new(root, {
          fill: root.interfaceColors.get("alternativeBackground"),
          fillOpacity: 1
      })
    }));

    chart.get("colors").set("step", 2);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var valueAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
        fill: am5.color(0x000000)
      }),
      height: am5.percent(70)
    }));
    

    valueAxis.get("renderer").labels.template.setAll({
      centerY: am5.percent(100),
      maxPosition: 0.98
    });

    valueAxis.axisHeader.children.push(am5.Label.new(root, {
      text: "거래소 최저가",
      fontWeight: "bold",
      paddingBottom: 5,
      paddingTop: 5
    }));
    var yRenderer = valueAxis.get("renderer");
    yRenderer.labels.template.setAll({
        fill: am5.color(0xffffff),
        fillOpacity: 0.5
    });
    yRenderer.grid.template.setAll({
        stroke: am5.color(0xffffff)
    });

    var dateAxis = chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
      groupData: false,
      maxDeviation: 1,
      baseInterval: { timeUnit: "minute", count: 30 },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));

    dateAxis.get("renderer").labels.template.setAll({
      minPosition: 0.01,
      maxPosition: 0.99
    });
    var xRenderer = dateAxis.get("renderer");
      xRenderer.labels.template.setAll({
        fill: am5.color(0xffffff),
        fillOpacity: 0.5
    });
    xRenderer.grid.template.setAll({
        stroke: am5.color(0xffffff)
    });

    var color = root.interfaceColors.get("background");

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var valueSeries = chart.series.push(
      am5xy.CandlestickSeries.new(root, {
        fill: color,
        clustered: false,
        calculateAggregates: true,
        stroke: color,
        name: "",
        xAxis: dateAxis,
        yAxis: valueAxis,
        valueYField: "close",
        openValueYField: "open",
        lowValueYField: "low",
        highValueYField: "high",
        valueXField: "date",
        lowValueYGrouped: "low",
        highValueYGrouped: "high",
        openValueYGrouped: "open",
        valueYGrouped: "close",
        legendValueText: "시가: {openValueY}    저가: {lowValueY}    고가: {highValueY}    종가: {valueY}",
        legendRangeValueText: "{valueYClose}"
      })
    );

    var valueTooltip = valueSeries.set("tooltip", am5.Tooltip.new(root, {
      getFillFromSprite: false,
      getStrokeFromSprite: true,
      getLabelFillFromSprite: true,
      autoTextColor: false,
      pointerOrientation: "horizontal",
      labelText: "[#000000][[{valueX.formatDate('yy-MM-dd')}({valueX.formatDate('EEE')}) {valueX.formatDate('HH:mm')}]][/]\n[#000000]종가:[/][bold]{valueY}[/]　[#000000]전봉기준:[/]{valueYChangePreviousPercent.formatNumber('[#146e00][bold]+#,###.##|[#820000][bold]#,###.##|[#999999][bold]0')}%[/]"
    }));
    valueTooltip.get("background").set("fill", root.interfaceColors.get("background"));


    // Add legend to axis header
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-headers/
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var valueLegend = valueAxis.axisHeader.children.push(
      am5.Legend.new(root, {
        useDefaultMarker: true
      })
    );
    valueLegend.data.setAll([valueSeries]);


    // Stack axes vertically
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Stacked_axes
    chart.leftAxesContainer.set("layout", root.verticalLayout);


    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}))
    cursor.lineX.setAll({
      stroke: am5.color(0xffffff)
    });
    cursor.lineY.setAll({
        stroke: am5.color(0xffffff)
    });


    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    var scrollbar = chart.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
      orientation: "horizontal",
      height: 50
    }));

    var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {})
    }));

    var sbValueAxis = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
      valueYField: "close",
      valueXField: "date",
      xAxis: sbDateAxis,
      yAxis: sbValueAxis
    }));

    sbSeries.fills.template.setAll({
      visible: true,
      fillOpacity: 0.3
    });


    // =========================================================
    // Data loading
    // =========================================================
    
    // actual data loading and handling when it is loaded
    var nowname = "";
    var loadingdata = 0;
    function loadData(unit, name) {
      loadingdata = 1;
      
      // Load external data
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data
      var toast = Toastify({
        text: `불러오는 중...`,
        position: "center",
        gravity: "bottom",
        duration: -1,
        close: false
      }).showToast();
      
      candledict = {"item":name, "unit":unit};
      var unitCount = 0;
      //30분, 1시간, 3시간, 6시간, 12시간, 1일, 1주, 1달
      if(unit == '30m'){
        unit = "minute";
        unitCount = 30;
      }else if(unit == '1h'){
        unit = "hour";
        unitCount = 1;
      }else if(unit == '3h'){
        unit = "hour";
        unitCount = 3;
      }else if(unit == '6h'){
        unit = "hour";
        unitCount = 6;
      }else if(unit == '12h'){
        unit = "hour";
        unitCount = 12;
      }else if(unit == '1d'){
        unit = "day";
        unitCount = 1;
      }else if(unit == '1w'){
        unit = "day";
        unitCount = 7;
      }else if(unit == '1M'){
        unit = "month";
        unitCount = 1;
      }
      
      // Handle loaded data
      $.ajax({
        type: 'POST',
        url: url + "/candlechart_data",
        data: candledict,
        success:function(json) {
          data = json['data'];
          
          // change base interval if it's different
          dateAxis.set("baseInterval", { timeUnit: unit, count: unitCount });
          sbDateAxis.set("baseInterval", { timeUnit: unit, count: unitCount });

          valueSeries.data.setAll(data);
          sbSeries.data.setAll(data);

          dateAxis.zoom(0, 1, 0);
          nowname = name;
          toast.hideToast();

          if(data.length > 60){
            enddate = data[data.length-60].date;

            valueSeries.events.once("datavalidated", function(ev, target) {
              dateAxis.zoomToDates(new Date(), new Date(enddate))
            })
          }

          loadingdata = 0;
        }
      });
    }

    // Button handlers
    var activeButton = $('#1d');;
    $("#candleBtn button").filter(function() {
      $(this).on("click", function() {
        if(loadingdata == 1){
          Toastify({
            text: "잠시만요...",
            position: "center",
            gravity: "bottom",
            duration: 1000,
            close: false
          }).showToast();
          return;
        }
        curitem = $('.candleitemList button').text();
        btnid = $(this).attr('id');
        if (currentUnit != btnid) {
          setActiveButton($(this));
          currentUnit = btnid;
        }else{
          return;
        }
        if(curitem == "아이템 선택"){
          return;
        }
        loadData(currentUnit, curitem);
      });
    });

    var currentUnit = "1d";

    function setActiveButton(button) {
      if (activeButton) {
        $(activeButton).removeClass("btn-outline-info");
        $(activeButton).addClass("btn-info");
      }
      activeButton = button;
      $(button).removeClass("btn-info");
      $(button).addClass("btn-outline-info");
    }

    function makeToolSeries(name, field, color, width, line){
      var name = name.replace("null,", "");
      var series;
      var dashharry;
      seriesDict = {
          name: name.trim(),
          xAxis: dateAxis,
          yAxis: valueAxis,
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
    }

    $("#candleMA #candlemake").on("click", function(e){
      var targetSeries = $('#candleMA #candleseries').text();
      if(targetSeries == "선택"){
        alert('대상을 선택하세요');
        return;
      }
      if(targetSeries == "시가"){
        targetSeries = "open";
      }else if(targetSeries == "종가"){
        targetSeries = "close";
      }else if(targetSeries == "저가"){
        targetSeries = "low";
      }else if(targetSeries == "고가"){
        targetSeries = "high";
      }
      var maLength = $('#candleMA #candlelength').val();
      if(301 > maLength < 1 ){
          alert('단위 최솟값은 2 이상, 최댓값은 300 이하입니다.');
          $('#candleMA #candlelength').val("2");
          return;
      }
      var maWidth = $('#candleMA #candlewidth').val();
      if(maWidth <= 0){
          alert('굵기 최솟값은 1 이상입니다.');
          $('#candleMA #candlewidth').val("1");
          return;
      }
      var maColor = $('#candleMA #candle-color-picker').val();
      if(maColor.length < 7){
          alert('선 색깔을 다시 확인해주세요.');
          return;
      }
      var seriesLine = $('#candleMA #candleline').text();

      series = chart.children._container.series;
      tempValueArray = [];
      toolData = [];
      if(series.length == 1){
          chartValueYField = series._values[0]._settings.valueYField;
          values = series._values[0]._data._values;
      }

      for (var i = 0; i < values.length; i++) {
        tempValueArray.push(values[i][targetSeries]);
        if(i+1 >= maLength){
            maDate = values[i]['date'];
            maValue = tempValueArray.reduce((a,b) => (a+b)) / maLength;
            toolData.push({maField : maValue, date : maDate});
            tempValueArray.shift();
        }
      }
      makeToolSeries(String(maLength)+"MA", "maField", maColor, maWidth, seriesLine);

      $("#candleMA").modal('hide');
    });

    //candleChart
    $('.candleitemList').on('click', function(){
      $(".candleitemList .dropdown-menu li").filter(function() {
        if($(this).children().prop('tagName') == 'INPUT'){
          return;
        }
        
        $(this).off('click');
        $(this).on('click', function(){
          $("#candlemyInput").val("");
          $(".candleitemList .dropdown-menu li").css('display', '');
          $(".candleitemList .dropdown-menu").scrollTop(0);

          if($(this).text() == nowname){
            return;
          }

          $(this).parent().parent().find(".btn").text($(this).text());
          
          loadData(currentUnit, $(this).text());
        });
      });
    });

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 500);
  });
});