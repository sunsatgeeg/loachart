function isEmptyValue(value) {
  if (isNaN(value)) return 0;
  return value;
}

function createqtyperset(event, ele) {
  event.preventDefault();
  event.stopPropagation();
  if (event.deltaY < 0) {
    if (ele.value == "") {
      ele.value = 0;
    }
    ele.value = parseInt(ele.value) + 1;
  } else if (event.deltaY > 0) {
    ele.value = parseInt(ele.value) - 1;
  }
  if (parseInt(ele.value) <= -1) ele.value = 0;

  ele.parentElement.parentElement.querySelectorAll('.dynamic-calc').forEach((e) => {
    if (e.getAttribute('origin-value').includes('.')) {
      if (Number.isInteger((parseFloat(e.getAttribute('origin-value')) * parseInt(ele.value)))) {
        e.textContent = (parseFloat(e.getAttribute('origin-value')) * parseInt(ele.value));
      } else {
        e.textContent = (parseFloat(e.getAttribute('origin-value')) * parseInt(ele.value)).toFixed((e.getAttribute('origin-value').substring(e.getAttribute('origin-value').indexOf('.') + 1)).length);
      }
    } else {
      e.textContent = parseInt(e.getAttribute('origin-value')) * parseInt(ele.value);
    }
  });
}

tippy('.bi', {
  allowHTML: true,
  onShow(instance) {
    instance.setContent(instance.reference.getAttribute('tooltipcontent'));
  },
  theme: 'light',
  placement: 'right',
});

function reloadPriceTXT() {
  document.querySelectorAll('#fresh-table .pricetxt').forEach((e) => {
    e.previousSibling.textContent = e.value;

    e.previousSibling.style.display = 'unset';
    e.style.width = `${e.previousSibling.offsetWidth + 16}px`;
    e.previousSibling.style.display = 'none';

    if (e.value == '') {
      e.value = 0;
      e.previousSibling.textContent = 0;
    }
    if (e.value.indexOf('0') == 0 && e.value.length >= 2) {
      e.value = e.value.substring(1);
    }


    e.addEventListener('click', () => {
      $table.bootstrapTable('toggleDetailView', e.parentElement.parentElement.getAttribute('data-index'));
    })

    e.addEventListener('change', () => {
      e.previousSibling.textContent = e.value;

      e.previousSibling.style.display = 'unset';
      e.style.width = `${e.previousSibling.offsetWidth + 16}px`;
      e.previousSibling.style.display = 'none';

      if (e.value == '') {
        e.value = 0;
        e.previousSibling.textContent = 0;
      }
      if (e.value.indexOf('0') == 0 && e.value.length >= 2) {
        e.value = e.value.substring(1);
      }

      temprowitemname = e.parentElement.parentElement.getAttribute("data-itemname");
      if (temprowitemname.indexOf('(') != -1) {
        temprowitemname = temprowitemname.substring(0, temprowitemname.indexOf('('))
      }

      itemPriceEdit(temprowitemname, e.value);
    })
  });
}

function newRow(index, row, $detail) {
  if ($detail.length == 0) return;

  tippy($detail[0].querySelectorAll('.hasTooltip'), {
    allowHTML: true,
    onShow(instance) {
      instance.setContent(instance.reference.getAttribute('tooltipcontent'));
    },
    theme: 'light',
    placement: 'top',
  });

  $detail[0].querySelectorAll('.pricetxt').forEach((e) => {
    e.previousSibling.textContent = e.value;

    e.previousSibling.style.display = 'unset';
    e.style.width = `${e.previousSibling.offsetWidth + 16}px`;
    e.previousSibling.style.display = 'none';

    if (e.value == '') {
      e.value = 0;
      e.previousSibling.textContent = 0;
    }
    if (e.value.indexOf('0') == 0 && e.value.length >= 2) {
      e.value = e.value.substring(1);
    }

    e.addEventListener('change', () => {
      e.previousSibling.textContent = e.value;

      e.previousSibling.style.display = 'unset';
      e.style.width = `${e.previousSibling.offsetWidth + 16}px`;
      e.previousSibling.style.display = 'none';

      if (e.value == '') {
        e.value = 0;
        e.previousSibling.textContent = 0;
      }
      if (e.value.indexOf('0') == 0 && e.value.length >= 2) {
        e.value = e.value.substring(1);
      }
    })
  })

  $detail[0].querySelectorAll('.ableEditPrice').forEach((e) => {
    e.addEventListener('change', (ele) => {

      var detailElement = e;
      while (true) {
        if (detailElement.className == "detail-view") break;
        detailElement = detailElement.parentElement;
      }
      var targetitemname = detailElement.previousSibling.getAttribute('data-itemname');

      itemPriceEdit(e.getAttribute('item'), e.value);
      $table.bootstrapTable('selectPage', 1)
      var pagewhilestopsign = false;
      while (true) {
        document.querySelectorAll("#fresh-table > tbody > tr").forEach((e) => {
          if (e.getAttribute('data-itemname') == targetitemname) {
            $table.bootstrapTable('toggleDetailView', parseInt(e.getAttribute('data-index')));
            pagewhilestopsign = true;
          }
        })
        if (pagewhilestopsign) break;
        $table.bootstrapTable('nextPage');
      }
    })
  })
}

document.querySelector('#helpbtn').addEventListener('click', function () {
  var helpimage = document.createElement('img');
  helpimage.src = "img/wisdom.png";
  document.querySelector('#modalimg1').appendChild(helpimage);

  helpimage = document.createElement('img');
  helpimage.src = "img/wisdomeffect.png";
  document.querySelector('#modalimg2').appendChild(helpimage);

  document.querySelector('#helpbtn').removeEventListener('click', arguments.callee);
}, false);

let isonlyTableBookmarkVisible = (()=>{
  if(localStorage.getItem("craftcalc_onlyTableBookmarkVisible") && localStorage.getItem("craftcalc_onlyTableBookmarkVisible") == "true") {
    document.querySelector("#onlyTableBookmarkBtn").style.color ="rgb(0,255,0)";
    document.querySelector("#onlyTableBookmarkBtn").style.borderColor ="rgb(0,255,0)";
    return true;
  }else{
    return false;
  }
})();
function onlyTableBookmarkVisible() {
  isonlyTableBookmarkVisible = !isonlyTableBookmarkVisible;
  document.querySelector("#onlyTableBookmarkBtn").style.color = isonlyTableBookmarkVisible ? "rgb(0,255,0)" : "";
  document.querySelector("#onlyTableBookmarkBtn").style.borderColor = isonlyTableBookmarkVisible ? "rgb(0,255,0)" : "";
  localStorage.setItem("craftcalc_onlyTableBookmarkVisible", isonlyTableBookmarkVisible);
  recipecalc();
}

var marketData;
var tradeCountData;
var $table = $('#fresh-table');
function recipecalc() {
  tabledata = [];
  tableDisplayData = [];
  temp = [];
  
  let tableBookmark;
  if(isonlyTableBookmarkVisible) tableBookmark = localStorage.getItem("craftcalc_tableBookmark").split(",");

  Object.keys(recipedata).forEach(function (item) {
    itemname = item;
    itemMarketName = item
    if (itemname.lastIndexOf('(') != -1) {
      temp.push(itemname.substring(0, itemname.lastIndexOf('(')));
      itemMarketName = itemname.substring(0, itemname.lastIndexOf('('));
    } else {
      temp.push(itemname);
    }
    recipe = recipedata[item];

    type = recipe['분류'];
    if (type == '배틀아이템') {
      type = "b";
    } else if (type == "요리") {
      type = "c";
    } else if (type == "특수") {
      type = "s";
    } else if (type == "생활도구") {
      type = "lt";
    }
    qty = recipe['수량'];
    requireEnerge = recipe['활동력'];

    craftprice = 0;
    for (var i = 4; i < Object.keys(recipe).length; i++) {
      thisitemname = Object.keys(recipe)[i];
      if (thisitemname.lastIndexOf('(') != -1) {
        thisitemname = thisitemname.substring(0, thisitemname.lastIndexOf('('));
      }
      thisitmeqty = recipe[Object.keys(recipe)[i]];

      if (thisitemname == '실링' || thisitemname == '현자의 돌') {
        calcprice = 0;
      } else if (thisitemname == "골드") {
        thissale = isEmptyValue(parseFloat($('#cc_' + type).val())) + isEmptyValue(parseFloat($('#cc_all').val()));
        if (thissale == 0) {
          calcprice = thisitmeqty;
        } else {
          calcprice = Math.floor(thisitmeqty - (thisitmeqty * (thissale / 100)));
        }
      } else {
        try {
          thisunit = itemunit[Object.keys(recipe)[i]];
          if (thisunit == undefined) {
            thisunit = 1;
          }
        } catch { }
        marketprice = marketData[thisitemname];
        if (Object.keys(recipe)[i].lastIndexOf('제작)') != -1) {
          for (var j = 0; j < tabledata.length; j++) {
            if (tabledata[j]['item'] == thisitemname) {
              marketprice = (tabledata[j]['craftprice'] / recipe[Object.keys(recipe)[i]]).toFixed(2);
              break;
            }
          }
        }
        temp.push(thisitemname)
        calcprice = marketprice * (thisitmeqty / thisunit);
      }
      craftprice += calcprice;
    }

    thisbuyprice = marketData[itemname]
    if (itemname.lastIndexOf('(') != -1) {
      thisbuyprice = marketData[itemname.substring(0, itemname.lastIndexOf('('))];
    }

    thisgs = isEmptyValue(parseFloat($('#gs_' + type).val())) + isEmptyValue(parseFloat($('#gs_all').val())) + 5;
    if (thisgs <= 5) {
      gsqty = qty;
    } else {
      gsqty = ((((((isEmptyValue(parseFloat($('#gs_' + type).val())) + isEmptyValue(parseFloat($('#gs_all').val()))) / 10) / 2) + 5) * qty) / 100) + qty;
    }
    thisprofit = ((thisbuyprice - Math.ceil(thisbuyprice * 0.05)) * gsqty - craftprice);

    this_e = isEmptyValue(parseFloat($('#e_' + type).val())) + isEmptyValue(parseFloat($('#e_all').val()));

    // 빛나는 아이템 재료 아이템을 제작해서 만들 때 활동력 추가 계산
    if (itemname.indexOf('빛나는 ') != -1 && itemname.indexOf('제작)') != -1) {
      baseItemName = itemname.replace("빛나는 ", "");
      baseItemName = baseItemName.substring(0, baseItemName.indexOf("("));
      baseItemReqireEnerge = recipedata[baseItemName]["활동력"];
      requireEnerge = requireEnerge + baseItemReqireEnerge;
    }
    let discountedItemEnergy = requireEnerge;
    if (this_e != 0) {
      discountedItemEnergy = parseInt(requireEnerge - (requireEnerge * (this_e / 100)));
      if (discountedItemEnergy == 0) {
        discountedItemEnergy = 1;
      }
    }

    if (thisbuyprice > (craftprice / qty)) {
      thisrecommend = "제작";
    } else {
      thisrecommend = "구매";
    }

    let profitperenergyGold = parseInt((Math.floor(10000 / discountedItemEnergy)) * thisprofit);
    // 하루 최대 제한 있는 아이템 예외 목록
    // 0628일 패치로 제한 사라짐 if(itemname == '현자의 가루') profitperenergyGold = parseInt((Math.floor(10000 / 1000)) * thisprofit);

    // console.log(thisitemname)

    tabledata.push({
      item: itemname,
      recommend: thisrecommend,
      buyprice: thisbuyprice,
      craftprice: craftprice.toFixed(2),
      profit: thisprofit.toFixed(2),
      profitperenergy: profitperenergyGold,
      dict: recipe,
      requireEnerge: requireEnerge,
      discountedItemEnergy: discountedItemEnergy,
      gsqty: gsqty,
      trade_count: tradeCountData[itemMarketName]
    });

    if(isonlyTableBookmarkVisible && !tableBookmark.includes(item)) return;
    
    tableDisplayData.push({
      item: itemname,
      recommend: thisrecommend,
      buyprice: thisbuyprice,
      craftprice: craftprice.toFixed(2),
      profit: thisprofit.toFixed(2),
      profitperenergy: profitperenergyGold,
      dict: recipe,
      requireEnerge: requireEnerge,
      discountedItemEnergy: discountedItemEnergy,
      gsqty: gsqty,
      trade_count: tradeCountData[itemMarketName]
    });
  });

  $table.bootstrapTable('load', tableDisplayData);
}

// $('#accordionitemprice').on('click', function(){
//   $accord = $('#accordionitemprice').find('.row');

//   ([...new Set(temp)].sort()).forEach(function(e){
//     originE = e;
//     let showName = e;
//     if(showName.lastIndexOf('[') != -1){
//       showName = showName.substring(0, showName.lastIndexOf('['));
//     }

//     try{
//       grade = iteminfo[e]["grade"];
//       image = iteminfo[e]["image"];
//       material = iteminfo[e]["material"];
//     }catch{
//       if(e.indexOf('빛나는 ') != -1){
//         behindE = e.substring(4);
//         try{behindE = behindE.replace("정령의 회복약", "정가");}catch{}
//         grade = recipedata[e + '('+behindE+' 구매)'].key.Element_001.value.slotData.iconGrade;
//         image = recipedata[e + '('+behindE+' 구매)'].key.Element_001.value.slotData.iconPath;
//       }else{
//         try{e = e.replace("융화 재료", "융화 재료(고고학)");}catch{}
//         grade = recipedata[e].key.Element_001.value.slotData.iconGrade;
//         image = recipedata[e].key.Element_001.value.slotData.iconPath;
//       }
//     }
//     $accord.append(`<div class="col-3 px-0"><div class="float-start"><img class="item-image" data-grade="${grade}" style="width:32px; height:32px;" src="https://cdn-lostark.game.onstove.com/${image}" alt=""> <span id='itemname' origin="${originE}">${showName}</span> : <span class="pricehide"></span><input class="pricetxt" type="text" value="${marketData[originE]}"></div>`);
//   });

//   $(this).off('click');
//   $(this).find($('.pricetxt')).filter(function(){
//     $(this).parent().find('.pricehide').text($(this).val());
//     $(this).width($(this).parent().find('.pricehide').width() + 16);

//     $(this).on("mousewheel",function(event,delta){
//       event.preventDefault();
//       event.stopPropagation();
//       if(delta>0){
//         $(this).val(parseInt($(this).val()) + 1);
//         $(this).parent().find('.pricehide').text($(this).val());
//       }else if(delta<0){
//         if($(this).val() == 0){return;}
//         $(this).val(parseInt($(this).val()) - 1);
//         $(this).parent().find('.pricehide').text($(this).val());
//       } 

//       marketData[$(this).parent().find('#itemname').attr('origin')] = parseInt($(this).val());
//       recipecalc();
//     });

//     $(this).on('input', function(){
//       $(this).parent().find('.pricehide').text($(this).val());
//       $(this).width($(this).parent().find('.pricehide').width() + 16);

//       if($(this).val() == ''){
//         $(this).val(0);
//         $(this).parent().find('.pricehide').text(0);
//       }
//       if($(this).val().indexOf('0') == 0 && $(this).val().length >= 2){
//         $(this).val($(this).val().substring(1));
//       }
//       marketData[$(this).parent().find('#itemname').attr('origin')] = parseInt($(this).val());
//       recipecalc();
//     })

//   });
// });

function detailFormatter(index, row) {
  if (!row) return;

  html = "";
  html += `<table class="table" style="cursor:auto;">
  <thead>
    <tr>
      <th scope="col">시세</th>
      <th scope="col">수수료</th>
      <th class="d-none d-lg-table-cell" scope="col">제작비용<br>(개당)</th>
      <th scope="col">재료</th>
      <th scope="col">시세</th>
      <th scope="col">구매<br>단위</th>
      <th scope="col">필요<br>개수</th>
      <th scope="col">합계</th>
      <th scope="col">제작비용</th>
      <th class="d-none d-lg-table-cell" scope="col">활동력<br>[영지효과]</th>
      <th scope="col">제작 수량<br>[영지효과]</th>
      <th scope="col">이익<br>(세트당)</th>
    </tr>
  </thead>
  <tbody>`;

  rowitemname = row['item'];
  if (rowitemname.lastIndexOf('(') != -1) {
    rowitemname = rowitemname.substring(0, rowitemname.lastIndexOf('('));
  }

  html += `
    <tr>
      <td><span class="pricehide"></span><input class="pricetxt ableEditPrice" item="${rowitemname}" type="text" value="${row['buyprice']}"></td>
      <td id="detail-tax">${Math.ceil(row['buyprice'] * 0.05)}</td>
      <td class="d-none d-lg-table-cell" id="detail-craftprice">${(row['craftprice'] / row['dict']['수량']).toFixed(2)}</td>
      <td>`;
  // 재료
  for (var i = 4; i < Object.keys(row['dict']).length; i++) {
    thisitemname = Object.keys(row['dict'])[i];
    if (thisitemname.lastIndexOf('(') != -1) {
      thisitemname = thisitemname.substring(0, thisitemname.lastIndexOf('('));
    }
    try {
      grade = iteminfo[thisitemname]["grade"];
      image = iteminfo[thisitemname]["image"];
    } catch {
      if (thisitemname.indexOf('빛나는 ') != -1) {
        behindE = thisitemname.substring(4);
        try { behindE = behindE.replace("정령의 회복약", "정가"); } catch { }
        grade = recipedata[thisitemname + '(' + behindE + ' 구매)'].key.Element_001.value.slotData.iconGrade;
        image = recipedata[thisitemname + '(' + behindE + ' 구매)'].key.Element_001.value.slotData.iconPath;
      } else {
        try { thisitemname = thisitemname.replace("융화 재료", "융화 재료(고고학)"); } catch { }
        grade = recipedata[thisitemname].key.Element_001.value.slotData.iconGrade;
        image = recipedata[thisitemname].key.Element_001.value.slotData.iconPath;
      }
    }
    html += `<p><img class="item-image" data-grade="${grade}" style="width:24px; height:24px;" src="https://cdn-lostark.game.onstove.com/${image}" alt=""> ${Object.keys(row['dict'])[i]}</p>`;
  }

  html += `</td>
      <td>`;

  // 재료시세
  for (var i = 4; i < Object.keys(row['dict']).length; i++) {
    thisitemname = Object.keys(row['dict'])[i];
    if (thisitemname.lastIndexOf('(') != -1) {
      thisitemname = thisitemname.substring(0, thisitemname.lastIndexOf('('));
    }

    if (thisitemname == "실링" || thisitemname == "현자의 돌") {
      html += `<p>0</p>`;
    } else if (thisitemname == "골드") {
      html += `<p>${row['dict'][Object.keys(row['dict'])[i]]}</p>`;
    } else {
      if (Object.keys(row['dict'])[i].lastIndexOf('제작)') != -1) {
        for (var j = 0; j < tabledata.length; j++) {
          if (tabledata[j]['item'] == thisitemname) {
            price = ((tabledata[j]['craftprice'] * row['dict'][Object.keys(row['dict'])[i]]) / tabledata[j]['dict']['수량']) / row['dict'][Object.keys(row['dict'])[i]];
            price = price.toFixed(2);
            html += `<p>${price}</p>`;
            break;
          }
        }
      } else {
        html += `<p><span class="pricehide"></span><input class="pricetxt ableEditPrice" type="text" item="${thisitemname}" value="${marketData[thisitemname]}"></p>`;
      }
    }
  }

  html += `</td>
      <td>`;

  // 구매 단위
  for (var i = 4; i < Object.keys(row['dict']).length; i++) {
    thisitemname = Object.keys(row['dict'])[i];
    if (thisitemname.lastIndexOf('(') != -1) {
      thisitemname = thisitemname.substring(0, thisitemname.lastIndexOf('('));
    }
    unit = itemunit[thisitemname];
    if (unit == undefined) {
      unit = 1;
    }

    html += `<p>${unit}</p>`;
  }

  html += `</td>
      <td>`;

  // 재료 개수
  for (var i = 4; i < Object.keys(row['dict']).length; i++) {
    thisitemname = Object.keys(row['dict'])[i];
    if (thisitemname.lastIndexOf('(') != -1) {
      thisitemname = thisitemname.substring(0, thisitemname.lastIndexOf('('));
    }
    if (thisitemname == "실링" || thisitemname == "골드" || thisitemname == "현자의 돌") {
      qty = 1;
    } else {
      qty = row['dict'][Object.keys(row['dict'])[i]];
    }

    html += `<p class="dynamic-calc" origin-value="${qty}">${qty}</p>`;
  }

  html += `</td>
      <td>`;

  // 재료 총 가격
  type = row['dict']['분류'];
  if (type == '배틀아이템') {
    type = "b";
  } else if (type == "요리") {
    type = "c";
  } else if (type == "특수") {
    type = "s";
  } else if (type == "생활도구") {
    type = "lt";
  }
  for (var i = 4; i < Object.keys(row['dict']).length; i++) {
    thisitemname = Object.keys(row['dict'])[i];
    if (thisitemname.lastIndexOf('(') != -1) {
      thisitemname = thisitemname.substring(0, thisitemname.lastIndexOf('('));
    }
    if (thisitemname == "실링" || thisitemname == "현자의 돌") {
      calcprice = 0;
    } else if (thisitemname == "골드") {
      thissale = isEmptyValue(parseFloat($('#cc_' + type).val())) + isEmptyValue(parseFloat($('#cc_all').val()));
      if (thissale == 0) {
        calcprice = row['dict'][Object.keys(row['dict'])[i]];
      } else {
        calcprice = Math.floor(row['dict'][Object.keys(row['dict'])[i]] - (row['dict'][Object.keys(row['dict'])[i]] * (thissale / 100)));
      }
    } else {
      try {
        thisunit = itemunit[Object.keys(row['dict'])[i]];
        if (thisunit == undefined) {
          thisunit = 1;
        }
      } catch { }
      marketprice = marketData[thisitemname];
      calcprice = ((marketprice / thisunit) * row['dict'][Object.keys(row['dict'])[i]]).toFixed(2)
      if (Object.keys(row['dict'])[i].lastIndexOf('제작)') != -1) {
        for (var j = 0; j < tabledata.length; j++) {
          if (tabledata[j]['item'] == thisitemname) {
            calcprice = ((tabledata[j]['craftprice'] / tabledata[j]['dict']['수량']).toFixed(2) * row['dict'][Object.keys(row['dict'])[i]]).toFixed(2);
            break;
          }
        }
      }
    }
    html += `<p class="dynamic-calc" origin-value="${calcprice}">${calcprice}</p>`;
  }
  html += `<td class="dynamic-calc" origin-value="${row['craftprice']}">${row['craftprice']}</td>
      <td class="d-none d-lg-table-cell">
        <span class="dynamic-calc" origin-value="${row['requireEnerge']}">${row['requireEnerge']}</span>
        <br>[<span class="dynamic-calc" origin-value="${row['discountedItemEnergy']}">${row['discountedItemEnergy']}</span>]
      </td>
      <td onmousewheel="createqtyperset(event,this.querySelector('.pricetxt'))">
        <span class="dynamic-calc" origin-value="${row['dict']['수량']}">${row['dict']['수량']}</span>
        <br>[<span class="dynamic-calc" origin-value="${row['gsqty']}">${row['gsqty']}</span> <i class="bi bi-question-circle-fill hasTooltip" tooltipcontent="기본 대성공 5%에서 영지효과 곱연산<br>-------------------------------------------------------<br>영지효과 대성공이 0이면 기본 대성공 확률 5% 반영 X"></i>]
        <br><span class="pricehide"></span><input class="pricetxt" style="width:31px;" onclick="javascript:if(this.value=='0') this.value='';" oninput="createqtyperset(event,this)" type="text" value="1">세트
      </td>
      <td>
        <span class="dynamic-calc" origin-value="${row['profit']}">${row['profit']}</span> <i class="bi bi-question-circle-fill hasTooltip" tooltipcontent="((${row['buyprice']} - ${Math.ceil(row['buyprice'] * 0.05)}) X ${row['gsqty']}) - ${row['craftprice']}<br>((개당 시세 - 개당 수수료) X 제작 수량) - 제작 비용"></i></td>
    </tr>
  </tbody>
</table>`;
  return html;
}

function buypriceFormatter(value, row) {
  return `<span class="pricehide"></span><input class="pricetxt" type="text" value="${value}">`;
}

function tooltip_item_show(e) {
  offtop = $(e).offset().top;
  offleft = $(e).offset().left + 75;
  keydata = JSON.parse($(e).attr('data-key'));

  tooltiphtml = `<div class="itemdic-item game-tooltip game-tooltip-item" style="position: absolute; left: ${offleft}px; top: ${offtop}px;">`;

  Object.keys(keydata).forEach(function (e) {
    tooltiphtml += `<div class="${keydata[e]['type']}">`;
    if (keydata[e]['type'] == "ItemTitle") {
      tooltiphtml += `<span class="slotData" data-grade="${keydata[e]['value']['slotData']['iconGrade']}"><img src="https://cdn-lostark.game.onstove.com/${keydata[e]['value']['slotData']['iconPath']}" alt="" data-grade="${keydata[e]['value']['slotData']['iconGrade']}" class="item-image"}></span>`;
      try {
        delete keydata[e]['value']['slotData'];
      } catch { }
      Object.keys(keydata[e]['value']).forEach(function (f) {
        tooltiphtml += `<span class="${f}">${keydata[e]['value'][f]}</span>`;
      });
    } else if (keydata[e]['type'] == "MultiTextBox") {
      keyvaluearr = keydata[e]['value'].split('|');
      keyvaluearr.forEach(function (g) {
        tooltiphtml += `<span>${g}</span>`;
      });
    } else {
      tooltiphtml += `${keydata[e]['value']}`;
    }
    tooltiphtml += `</div>`;
  });

  $('body').append(tooltiphtml);
}
function tooltip_item_hide(e) {
  $('body').find('.game-tooltip-item').remove()
}

waringitemarr = ['신호탄', '회복약'];
function profitperenergyFormatter(value, row) {
  if (waringitemarr.indexOf(row['item']) != -1) {
    return value + ` <i class="bi bi-exclamation-circle-fill" style="color:red;" onmouseover="tippy($(this)[0], { content: '제작 활동력이 1이라서 비상식적인 이득이 나온 것입니다. 실제론 활동력 1만 못 녹입니다.',theme: 'light', placement: 'bottom', });"></i>`;
  } else {
    return value;
  }
}

function tradeCountFormatter(value, row) {
  return value.toLocaleString()
}

function rowAttributes(row, index) {
  return {
    'data-itemname': row.item,
  }
}

function item(value, row, index) {
  let formatter = '<div class="d-flex" style="width: max-content;">';
  let itemName = row.item;
  let itemImagePath = row.dict.key.Element_001.value.slotData.iconPath;
  let itemGrade = row.dict.key.Element_001.value.slotData.iconGrade;

  if(!localStorage.getItem("craftcalc_tableBookmark")) localStorage.setItem("craftcalc_tableBookmark", "");
  const tableBookmark = localStorage.getItem("craftcalc_tableBookmark").split(",");
  let isBookmark = tableBookmark.includes(row.item);
  
  formatter += `<div class="d-flex position-relative my-1 me-2" style="width: max-content">
                  <img data-key="${JSON.stringify(row.dict.key).replace(/"/gi, "&quot;")}" class="item-image" data-grade="${itemGrade}" src="https://cdn-lostark.game.onstove.com/${itemImagePath}" onmouseover="tooltip_item_show(this);" onmouseout="tooltip_item_hide(this);" style="width: 64px;">
                  <div class="bookmarkIcon bottom-0 end-0 ${isBookmark ? "active" : ""}" data-itemName="${row.item}" onclick="${isBookmark ? "removeTableBookmarkItem" : "addTableBookmarkItem"}(event, this)"></div>
                </div>`

  formatter += '<div class="align-self-center">';
  if (itemName.includes("구매)")) {
    formatter += `<span class="d-none d-lg-inline">${itemName.substring(0, itemName.indexOf("("))}</span>
                  <span class="d-none d-lg-inline">${itemName.substring(itemName.indexOf("("))}</span>
                  <span class="d-md-block d-lg-none">일부<br>구매</span>`
  } else if (itemName.includes("제작)")) {
    formatter += `<span class="d-none d-lg-inline">${itemName.substring(0, itemName.indexOf("("))}</span>
                  <span class="d-none d-lg-inline">${itemName.substring(itemName.indexOf("("))}</span>
                  <span class="d-md-block d-lg-none">일부<br>제작</span>`
  } else {
    formatter += `<span class="d-none d-lg-inline">${itemName}</span>`;
  }
  formatter += "</div>";

  formatter += "</div>";
  return formatter;
}

function recomcellStyle(value, row, index) {
  if (row['recommend'] == '구매') {
    return {
      css: {
        color: 'red'
      }
    }
  } else {
    return {
      css: {
        color: '#00ff00'
      }
    }
  }
}

function profcellStyle(value, row, index) {
  if (row['profit'] <= 0) {
    return {
      css: {
        color: 'red'
      }
    }
  } else {
    return {
      css: {
        color: '#00ff00'
      }
    }
  }
}

function itemPriceEdit(name, price) {
  document.querySelectorAll(".gold").forEach((e)=>{
    if(e.getAttribute("data-itemname") === name) e.value = price;
  })
  marketData[name] = parseInt(price);
  recipecalc();
}

function updateAllItemPrice() {
  Object.keys(iteminfo).forEach((e) => {
    try {

      originE = e;
      let showName = e;
      if (showName.lastIndexOf('[') != -1) showName = showName.substring(0, showName.lastIndexOf('['));

      try {
        grade = iteminfo[e]["grade"];
        image = iteminfo[e]["image"];
        material = iteminfo[e]["material"];
      } catch {
        if (e.indexOf('빛나는 ') != -1) {
          behindE = e.substring(4);
          try { behindE = behindE.replace("정령의 회복약", "정가"); } catch { }
          grade = recipedata[e + '(' + behindE + ' 구매)'].key.Element_001.value.slotData.iconGrade;
          image = recipedata[e + '(' + behindE + ' 구매)'].key.Element_001.value.slotData.iconPath;
        } else {
          try { e = e.replace("융화 재료", "융화 재료(고고학)"); } catch { }
          grade = recipedata[e].key.Element_001.value.slotData.iconGrade;
          image = recipedata[e].key.Element_001.value.slotData.iconPath;
        }
      }

      let animationSecond = showName.length >= 5 ? 50 / showName.length : 0;
      let tElement = document.getElementById(`flush-${material}`).getElementsByClassName('accordion-body')[0];
      let functionStr = `itemPriceEdit(this.getAttribute('data-itemName'), this.value)`;
      tElement.innerHTML += `<div class="col-2 col-sm-1point2 d-flex ps-1 pe-0" style="flex-direction: column;">
                                <div class="d-flex position-relative">
                                  <img class="mx-auto item-image" data-grade="${grade}" data-itemName="${originE}" src="https://cdn-lostark.game.onstove.com/${image}" alt="" style="width: 100%; cursor: pointer;" onclick="$table.bootstrapTable('refreshOptions', { searchText: '${originE}' });">
                                  <div class="bookmarkIcon bottom-0 end-0" data-itemName="${originE}" onclick="addBookmarkItem(this)"></div>
                                </div>
                                <div class="scroll-container"><div class="text-white scroll-text text-center" id="itemname" origin="${originE}"style="--second: ${animationSecond}s; --length: -400%; text-overflow: ellipsis; white-space: nowrap;">${showName}</div></div>
                                <input class="gold text-start" type="number" min="0" data-itemName="${originE}" value="${marketData[originE]}" oninput="${functionStr}">
                            </div>`;

    } catch { }
  });
}

function addBookmarkItem(element) {
  let name = element.getAttribute('data-itemName');
  let bookmark = localStorage.getItem("craftcalc_bookmark").split(",");
  
  element.classList.add('active');
  element.setAttribute('onclick', 'removeBookmarkItem(this)');
  // document.querySelectorAll(".bookmarkIcon").forEach((e)=>{
  //   if(e.getAttribute("data-itemname") === name){
  //     e.setAttribute('onclick', 'removeBookmarkItem(this)');
  //   }
  // })

  if(!bookmark.includes(name)) bookmark.push(name);
  
  localStorage.setItem("craftcalc_bookmark", bookmark);
  loadBookmarkItem();
}

function addTableBookmarkItem(event, element) {
  let name = element.getAttribute('data-itemName');
  let tableBookmark = localStorage.getItem("craftcalc_tableBookmark").split(",");
  
  element.classList.add('active');
  element.setAttribute('onclick', 'removeTableBookmarkItem(event, this)');

  if(!tableBookmark.includes(name)) tableBookmark.push(name);
  
  localStorage.setItem("craftcalc_tableBookmark", tableBookmark);
  event.stopPropagation();
}

function removeBookmarkItem(element) {
  let name = element.getAttribute('data-itemName');
  let bookmark = localStorage.getItem("craftcalc_bookmark").split(",");

  let removedCount = 0;
  document.querySelectorAll(".bookmarkIcon").forEach((e)=>{
    if(removedCount >= 2) return;

    if(e.getAttribute("data-itemname") === name){
      e.classList.remove('active');
      e.setAttribute('onclick', 'addBookmarkItem(this)');
      removedCount += 1;
    }
  })

  const findIndex = bookmark.indexOf(name);
  if(findIndex > -1) bookmark.splice(findIndex, 1);

  localStorage.setItem("craftcalc_bookmark", bookmark);
  loadBookmarkItem();
}

function removeTableBookmarkItem(event, element) {
  let name = element.getAttribute('data-itemName');
  let tableBookmark = localStorage.getItem("craftcalc_tableBookmark").split(",");

  element.classList.remove('active');
  element.setAttribute('onclick', 'addTableBookmarkItem(event, this)');

  const findIndex = tableBookmark.indexOf(name);
  if(findIndex > -1) tableBookmark.splice(findIndex, 1);

  localStorage.setItem("craftcalc_tableBookmark", tableBookmark);
  recipecalc();
  event.stopPropagation();
}

function loadBookmarkItem() {
  if(!localStorage.getItem("craftcalc_bookmark")) localStorage.setItem("craftcalc_bookmark", "");

  const bookmark = localStorage.getItem("craftcalc_bookmark").split(",");
  if(bookmark == null) return;
  
  let tElement = document.getElementById('bookmark');
  while (tElement.hasChildNodes()) {
    tElement.removeChild(tElement.firstChild);
  }

  bookmark.forEach((e) => {
    try {
      // console.log(e);
      originE = e;
      let showName = e;
      if (showName.lastIndexOf('[') != -1) showName = showName.substring(0, showName.lastIndexOf('['));

      try {
        grade = iteminfo[e]["grade"];
        image = iteminfo[e]["image"];
        material = iteminfo[e]["material"];
      } catch {
        if (e.indexOf('빛나는 ') != -1) {
          behindE = e.substring(4);
          try { behindE = behindE.replace("정령의 회복약", "정가"); } catch { }
          grade = recipedata[e + '(' + behindE + ' 구매)'].key.Element_001.value.slotData.iconGrade;
          image = recipedata[e + '(' + behindE + ' 구매)'].key.Element_001.value.slotData.iconPath;
        } else {
          try { e = e.replace("융화 재료", "융화 재료(고고학)"); } catch { }
          grade = recipedata[e].key.Element_001.value.slotData.iconGrade;
          image = recipedata[e].key.Element_001.value.slotData.iconPath;
        }
      }

      let animationSecond = showName.length >= 5 ? 50 / showName.length : 0;
      let functionStr = `itemPriceEdit(this.getAttribute('data-itemName'), this.value)`;
      tElement.innerHTML += `<div class="col-2 col-sm-1point2 d-flex ps-1 pe-0" style="flex-direction: column;">
                                <div class="d-flex position-relative">
                                  <img class="mx-auto item-image" data-grade="${grade}" src="https://cdn-lostark.game.onstove.com/${image}" alt="" style="width: 100%; cursor: pointer;" onclick="$table.bootstrapTable('refreshOptions', { searchText: '${originE}' });">
                                  <div class="bookmarkIcon bottom-0 end-0" data-itemName="${originE}" onclick="removeBookmarkItem(this)"></div>
                                </div>
                                <div class="scroll-container"><div class="text-white scroll-text text-center" id="itemname" origin="${originE}"style="--second: ${animationSecond}s; --length: -400%; text-overflow: ellipsis; white-space: nowrap;">${showName}</div></div>
                                <input class="gold text-start" type="number" min="0" data-itemName="${originE}" value="${marketData[originE]}" oninput="${functionStr}">
                            </div>`;
      
      document.querySelectorAll(".bookmarkIcon").forEach((e)=>{
        if(e.getAttribute("data-itemname") === originE){
          e.setAttribute('onclick', 'removeBookmarkItem(this)');
          e.classList.add('active');
          return;
        }
      })

    } catch { }
  });
}

$(function () {
  $table.bootstrapTable({
    classes: 'table table-hover table-striped',
    toolbar: '.toolbar',
    search: true,
    pagination: true,
    striped: true,
    pageSize: 10,
    pageList: [10, 25, 50, 100],
    pageSize: localStorage.getItem("craftcalc_pageSize") ? localStorage.getItem("craftcalc_pageSize") : 10,
    onExpandRow: newRow,
    onPostBody: reloadPriceTXT,
    sortName: localStorage.getItem("craftcalc_sortName") ? localStorage.getItem("craftcalc_sortName") : "profitperenergy",
    sortOrder: localStorage.getItem("craftcalc_sortOrder") ? localStorage.getItem("craftcalc_sortOrder") : "desc",

    onSort:(name, order)=>{
      localStorage.setItem("craftcalc_sortName", name);
      localStorage.setItem("craftcalc_sortOrder", order);
    },
    onPageChange: (number, size)=>{
      localStorage.setItem("craftcalc_pageSize", size);
    },
    formatShowingRows: function (pageFrom, pageTo, totalRows) {
      return ''
    },
    formatRecordsPerPage: function (pageNumber) {
      return pageNumber + ' 줄 표시'
    },
  })

  $('#wisdomeffectclear').on('click', function () {
    $('#wisdomeffect').find('input').filter(function () {
      $(this).val('');
      localStorage.removeItem("craftcalc_"+$(this).attr('id'), '');
      $("#wisdomEffectEditOpenBtn").css("border-color", "");
      $("#wisdomEffectEditOpenBtn").css("color", "");
      recipecalc();
    });
  });

  $('#wisdomeffect').find('input').filter(function () {
    givemeid = $(this).attr('id');
    if (localStorage.getItem("craftcalc_"+givemeid) == undefined || localStorage.getItem("craftcalc_"+givemeid) == '') {
      $(this).val('');
    } else {
      $(this).val(localStorage.getItem("craftcalc_"+givemeid));
      $("#wisdomEffectEditOpenBtn").css("border-color", "rgb(0, 255, 0)");
      $("#wisdomEffectEditOpenBtn").css("color", "rgb(0, 255, 0)");
    }

    $(this).hover(() => {
      $(this).focus();
    })

    $(this).on('input', function () {
      thiseffectname = $(this).attr('id');
      thiseffectval = $(this).val();

      if (parseFloat(thiseffectval) <= 0) {
        $(this).val('');
        thiseffectval = '';
      }

      $("#wisdomEffectEditOpenBtn").css("border-color", "rgb(0, 255, 0)");
      $("#wisdomEffectEditOpenBtn").css("color", "rgb(0, 255, 0)");

      localStorage.setItem("craftcalc_"+thiseffectname, thiseffectval);
      recipecalc();
    });
  });

  $.ajax({
    type: 'POST',
    url: url + '/craftcalc',
    success: function (json) {
      marketData = json[0];
      tradeCountData = json[1]

      jsondate = String(marketData['date']);
      db_year = jsondate.slice(0, 4);
      db_mon = jsondate.slice(4, 6);
      db_day = jsondate.slice(6, 8);
      db_hour = jsondate.slice(8, 10);
      db_min = jsondate.slice(10, 12);

      $('#markettime').text('' + db_year + "-" + db_mon + "-" + db_day + " " + db_hour + ":" + db_min + " 기준");

      updateAllItemPrice();
      loadBookmarkItem();
      recipecalc();
    }
  });
});