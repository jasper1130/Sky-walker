function add (num){
    var add = Number(document.getElementsByClassName("input-num")[num].value);
    if(add < 200){
        document.getElementsByClassName("input-num")[num].value = add + 1;
    }
    else{
        alert("商品數量不可大於200");
    }
}

function minus(num){
    var minus = Number(document.getElementsByClassName("input-num")[num].value);
    if(minus > 1){
        document.getElementsByClassName("input-num")[num].value = minus - 1;
    }
    else{
        window.alert("商品數量不可小於1");
    }          
}

// var num_jia = document.getElementById("num-jia");
// var num_jian = document.getElementById("num-jian");
// var input_num = document.getElementById("input-num");

// num_jia.onclick = function() {
//     input_num.value = parseInt(input_num.value) + 1;
// }

// num_jian.onclick = function() {
//     if(input_num.value <= 0) {
//     input_num.value = 0;
//     } 
//     else {
//         input_num.value = parseInt(input_num.value) - 1;
//     }
// }

var MARK_INFO = [
           '1分|很不滿意|差得太離譜，與賣家描述的嚴重不符，非常不滿',
           '2分|不滿意|部分有破損，與賣家描述的不符，不滿意',
           '3分|一般|質量一般，沒有賣家描述的那麼好',
           '4分|滿意|質量不錯，與賣家描述的基本一致，還是挺滿意的',
           '5分|非常滿意|質量非常好，與賣家描述的完全一致，非常滿意'
        ];
function delegateEvent(delegateElement, targetTag, eventName, handler) {
  delegateElement.addEventListener(eventName, function (event) {
      var target = event.target;
      if (target.nodeName.toLowerCase() === targetTag.toLowerCase()) {
        return handler(event);
      }
    } ,false);
}

function hasClass(element, className) {
  return (new RegExp('(^|\\s)' + className + '($|\\s)')).test(element.className);
}

function addClass(element, newClassName) {
  if (!hasClass(element, newClassName)) {
    element.className += element.className ? (' ' + newClassName) : newClassName; 
  }
}

function removeClass(element, oldClassName) {
  if (hasClass(element, oldClassName)) {
    element.className = element.className.replace(new RegExp('(^|\\s)' + oldClassName + '($|\\s)'), ' ').trim(); 
  }
}

function lightenStar(stars, activeIndex) {
  for (var i = 0; i <= activeIndex; i++) {
    addClass(stars[i], 'light');
  }
}

function darkenStar(stars) {
  for (var i = 0; i < stars.length; i++) {
    removeClass(stars[i], 'light');
  }
}

var starMark = document.getElementsByClassName('star-mark')[0];
var stars = starMark.getElementsByClassName('star')[0].getElementsByTagName('li');
var helpInfo = starMark.getElementsByClassName('help-info')[0];
var cnofirmIndex = -1;

delegateEvent(starMark, 'li', 'click', function (event) {
  var target = event.target;
  var markResult = starMark.getElementsByClassName('result')[0];
  cnofirmIndex = Array.prototype.indexOf.call(stars, target);
  lightenStar(stars, cnofirmIndex);

  var markNumDiv = markResult.getElementsByClassName('mark')[0];
  var markDetailDiv = markResult.getElementsByClassName('detail')[0];
  var infos = MARK_INFO[cnofirmIndex].split('|');
  markNumDiv.textContent = infos[0];
  markDetailDiv.textContent = '（' +　infos[2] + '）';
});

delegateEvent(starMark, 'li', 'mouseover', function (event) {
  var target = event.target;
  hoverIndex = Array.prototype.indexOf.call(stars, target);
  darkenStar(stars);
  lightenStar(stars, hoverIndex);

  helpInfo.style.display = 'block';
  helpInfo.style.left = (hoverIndex + 1) * 25 + 'px';

  var helpMark = helpInfo.getElementsByClassName('mark')[0];
  var helpDescri = helpInfo.getElementsByClassName('decri')[0];
  var helpDetail = helpInfo.getElementsByClassName('detail')[0];
  var infos = MARK_INFO[hoverIndex].split('|');
  helpMark.textContent = infos[0];
  helpDescri.textContent = infos[1];
  helpDetail.textContent = infos[2];
});

delegateEvent(starMark, 'li', 'mouseout', function (event) {
  var target = event.target;
  darkenStar(stars);
  lightenStar(stars, cnofirmIndex);
  helpInfo.style.display = 'none';
});
