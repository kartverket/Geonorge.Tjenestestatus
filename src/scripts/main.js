var getDefaultValue = function (val, def) {
  if (def === undefined || def === null) def = ''
  return val === undefined || val === true ? def : val
}

var re = /([a-z]{3})\/([a-f0-9\-]{36})?/i
var match =  location.pathname.match(re)

var FURL = match === null ? false : true
var TYPE = (match === null ? getDefaultValue(Url.queryString('type')) : match[1]).toUpperCase()
var UUID = (match === null ? getDefaultValue(Url.queryString('uuid')) : match[2]).toString()

var typeIsDefined = TYPE.length == 3 ? true : false
var uuidIsDefined = UUID.length == 36 ? true : false

if (typeIsDefined) {
  document.title = TYPE + ' - ' + document.title
  var breadcrumb = document.getElementById('breadcrumb-type')
  if (breadcrumb) {
    var serviceElement;
    if (uuidIsDefined) {
      var serviceUrl = FURL ? location.pathname.replace(UUID, '') : location.pathname + '?type=' + TYPE.toLowerCase()
      serviceElement = document.createElement('a')
      serviceElement.setAttribute('href', serviceUrl)
    } else {
      serviceElement = document.createElement('span')
    }
    serviceElement.appendChild(document.createTextNode(TYPE))
    breadcrumb.appendChild(serviceElement)
  }

  var serviceTypes = document.getElementsByClassName('service-type')
  Array.prototype.forEach.call(serviceTypes, function (serviceType) {
    serviceType.textContent = TYPE
  })
}
