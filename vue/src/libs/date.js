
export function getDate(_data = null, format="yyyy-MM-dd") {
  let data = null;
  if (_data === null) {
    data = new Date()
  } else {
    data = _data
  }

  var o = {
    "M+" : data.getMonth()+1, //month
    "d+" : data.getDate(), //day
    "h+" : data.getHours(), //hour
    "m+" : data.getMinutes(), //minute
    "s+" : data.getSeconds(), //second
    "q+" : Math.floor((data.getMonth()+3)/3), //quarter
    "S" : data.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (data.getFullYear()+"").substr(4- RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
    RegExp.$1.length==1? o[k] :
    ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
export function dateAdd (cur,strInterval, Number) {  
  let dtTmp = new Date(cur); 
  switch (strInterval) {  
      case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number)); 
      case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number)); 
      case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number)); 
      case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number)); 
      case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number)); 
      case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
      case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
      case 'y' :return new Date((parseInt(dtTmp.getFullYear()) + parseInt(Number)), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
  } 
} 

export function getDayWeek (cur, _dataNum) {
	let dateWeek = [];
	switch(_dataNum){
		case 0:  dateWeek[0] = getDate(dateAdd(cur, 'd', 0), 'yyyy/MM/dd') ;
						 dateWeek[1] = getDate(dateAdd(cur, 'd', -6), 'yyyy/MM/dd') ;
						 dateWeek[2] = getDate(dateAdd(cur, 'd', -5), 'yyyy/MM/dd') ;
						 dateWeek[3] = getDate(dateAdd(cur, 'd', -4), 'yyyy/MM/dd') ;
						 dateWeek[4] = getDate(dateAdd(cur, 'd', -3), 'yyyy/MM/dd') ;
						 dateWeek[5] = getDate(dateAdd(cur, 'd', -2), 'yyyy/MM/dd') ;
						 dateWeek[6] = getDate(dateAdd(cur, 'd', -1), 'yyyy/MM/dd') ;
		      break;
		case 1:  dateWeek[0] = getDate(dateAdd(cur, 'd', 6), 'yyyy/MM/dd') ;
						 dateWeek[1] = getDate(dateAdd(cur, 'd', 0), 'yyyy/MM/dd') ;
						 dateWeek[2] = getDate(dateAdd(cur, 'd', 1), 'yyyy/MM/dd') ;
						 dateWeek[3] = getDate(dateAdd(cur, 'd', 2), 'yyyy/MM/dd') ;
						 dateWeek[4] = getDate(dateAdd(cur, 'd', 3), 'yyyy/MM/dd') ;
						 dateWeek[5] = getDate(dateAdd(cur, 'd', 4), 'yyyy/MM/dd') ;
						 dateWeek[6] = getDate(dateAdd(cur, 'd', 5), 'yyyy/MM/dd') ;
		      break;
		case 2:  dateWeek[0] = getDate(dateAdd(cur, 'd', 5), 'yyyy/MM/dd') ;
						 dateWeek[1] = getDate(dateAdd(cur, 'd', -1), 'yyyy/MM/dd') ;
						 dateWeek[2] = getDate(dateAdd(cur, 'd', 0), 'yyyy/MM/dd') ;
						 dateWeek[3] = getDate(dateAdd(cur, 'd', 1), 'yyyy/MM/dd') ;
						 dateWeek[4] = getDate(dateAdd(cur, 'd', 2), 'yyyy/MM/dd') ;
						 dateWeek[5] = getDate(dateAdd(cur, 'd', 3), 'yyyy/MM/dd') ;
						 dateWeek[6] = getDate(dateAdd(cur, 'd', 4), 'yyyy/MM/dd') ;
		      break;
		case 3:  dateWeek[0] = getDate(dateAdd(cur, 'd', 4), 'yyyy/MM/dd') ;
						 dateWeek[1] = getDate(dateAdd(cur, 'd', -2), 'yyyy/MM/dd') ;
						 dateWeek[2] = getDate(dateAdd(cur, 'd', -1), 'yyyy/MM/dd') ;
						 dateWeek[3] = getDate(dateAdd(cur, 'd', 0), 'yyyy/MM/dd') ;
						 dateWeek[4] = getDate(dateAdd(cur, 'd', 1), 'yyyy/MM/dd') ;
						 dateWeek[5] = getDate(dateAdd(cur, 'd', 2), 'yyyy/MM/dd') ;
						 dateWeek[6] = getDate(dateAdd(cur, 'd', 3), 'yyyy/MM/dd') ;
		      break;
		case 4:  dateWeek[0] = getDate(dateAdd(cur, 'd', 3), 'yyyy/MM/dd') ;
						 dateWeek[1] = getDate(dateAdd(cur, 'd', -3), 'yyyy/MM/dd') ;
						 dateWeek[2] = getDate(dateAdd(cur, 'd', -2), 'yyyy/MM/dd') ;
						 dateWeek[3] = getDate(dateAdd(cur, 'd', -1), 'yyyy/MM/dd') ;
						 dateWeek[4] = getDate(dateAdd(cur, 'd', 0), 'yyyy/MM/dd') ;
						 dateWeek[5] = getDate(dateAdd(cur, 'd', 1), 'yyyy/MM/dd') ;
						 dateWeek[6] = getDate(dateAdd(cur, 'd', 2), 'yyyy/MM/dd') ;
		      break;
		case 5:  dateWeek[0] = getDate(dateAdd(cur, 'd', 2), 'yyyy/MM/dd') ;
						 dateWeek[1] = getDate(dateAdd(cur, 'd', -4), 'yyyy/MM/dd') ;
						 dateWeek[2] = getDate(dateAdd(cur, 'd', -3), 'yyyy/MM/dd') ;
						 dateWeek[3] = getDate(dateAdd(cur, 'd', -2), 'yyyy/MM/dd') ;
						 dateWeek[4] = getDate(dateAdd(cur, 'd', -1), 'yyyy/MM/dd') ;
						 dateWeek[5] = getDate(dateAdd(cur, 'd', 0), 'yyyy/MM/dd') ;
						 dateWeek[6] = getDate(dateAdd(cur, 'd', 1), 'yyyy/MM/dd') ;
		      break; 
		case 6:  dateWeek[0] = getDate(dateAdd(cur, 'd', 1), 'yyyy/MM/dd') ;
						 dateWeek[1] = getDate(dateAdd(cur, 'd', -5), 'yyyy/MM/dd') ;
						 dateWeek[2] = getDate(dateAdd(cur, 'd', -4), 'yyyy/MM/dd') ;
						 dateWeek[3] = getDate(dateAdd(cur, 'd', -3), 'yyyy/MM/dd') ;
						 dateWeek[4] = getDate(dateAdd(cur, 'd', -2), 'yyyy/MM/dd') ;
						 dateWeek[5] = getDate(dateAdd(cur, 'd', -1), 'yyyy/MM/dd') ;
						 dateWeek[6] = getDate(dateAdd(cur, 'd', 0), 'yyyy/MM/dd') ;
		      break;
		      
		default: dateWeek = [];
	}
	
	return dateWeek;	
}
