var css = require('css');
var classes = require('classes');

module.exports = tagcloud;

//json object with the tags , minimum and maximum font size
function tagcloud(tags, minPercent, maxPercent){
  var sortedTags = sortObjByValue(tags);
  var tagArray = convertToArray(tags);
  var minPercent = minPercent || 80;
  var maxPercent = maxPercent || 280;
  var min = sortedTags[0].value.weight;
  var max = sortedTags.slice(-1)[0].value.weight;
  var steps = sortedTags.length - 1;
  var originalStep = calculateStep(min,max,steps);
  var percentStep = calculateStep(minPercent,maxPercent,steps);
 
  var ul = document.createElement('ul');
  classes(ul).add('tagcloud');
  
  tagArray.forEach(function (el,i){
    var li =  document.createElement('li');
    var link = document.createElement('a');
    link.textContent = el.tag;
    link.setAttribute('href', el.value.link);
    var distance = distanceFromStart(min,el.value.weight);
    var size =  minPercent + mapCalculation(originalStep, percentStep,distance);

    css(link, {
      fontSize:size+"%"
    }) 

    li.appendChild(link);
    ul.appendChild(li);
  })   
  return ul;
}

//sort an object by a specific value
function sortObjByValue(obj){
  var sortable = [];
  for(var key in obj){
    sortable.push({tag : key, value : obj[key]})
  }
  var sorted = sortable.sort(function(a,b) { return a.value.weight - b.value.weight });
  
  return sorted;
}

function convertToArray(obj){
  var array = [];
  for(var key in obj){
    array.push({tag : key,  value : obj[key]})
  }
   return array;
}

//calculate the step needed to go to max from min in n steps
function calculateStep(min,max,steps){
  var step = (max - min)/steps; 
  return step; 
}
//calculate values distance from lower
function distanceFromStart(lower,value){
  var distance = value - lower;
  return distance 
}
//calculate a value based on the step values we already have calculated
function mapCalculation(step1,step2,distance){
  var mapDistance = (step2 * distance)/step1;
  return mapDistance;
}
