
function getPersistent(cname) {
  return localStorage.getItem(cname);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie;
        ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function sprintf() {
    var args = arguments,
    string = args[0],
    i = 1;
    return string.replace(/%((%)|s|d)/g, function (m) {
        // m is the matched format, e.g. %s, %d
        var val = null;
        if (m[2]) {
            val = m[2];
        } else {
            val = args[i];
            // A switch statement so that the formatter can be extended. Default is %s
            switch (m) {
                case '%d':
                    val = parseInt(val);
                    if (isNaN(val)) {
                        val = 0;
                    }
                    break;

                case '%f':
                    val = parseFloat(val);
                    if (isNaN(val)) {
                        val = 0;
                    }
                    break;
            }
            i++;
        }
        return val;
    });
}

function randItem(Items) {
  return Items[Math.floor(Math.random() * Items.length)];
}

function getSite(Sites, Queries) {
  return sprintf("http://" + randItem(Sites), randItem(Queries));
}

function showSite(Site, Query) {
  // window.open(sprintf("http://" + Site', Query);
  window.open(sprintf("http://" + Site, Query), '_blank');
}

function showGlobalSite() {
  showSite(getPersistent("globalSite"), getPersistent("globalQuery"));
}



function setGlobalQuery(Query) {
  localStorage.globalQuery = Query;
}
function setQuery(Query) {
  setGlobalQuery(Query);
  showGlobalSite();
}


function setGlobalSite(Site) {
  localStorage.globalSite = Site;
}
function setSite(Site) {
  setGlobalSite(Site);
  showGlobalSite();
}


function abbr(s) {
  return s.match(/[A-Z][a-z0-9]*/);
}

function commonButton(s) {
  var b = document.createElement("BUTTON");
  b.appendChild(document.createTextNode(abbr(s)));
  document.body.appendChild(b);
  return b;
}

function qButton(site) {
  var b = commonButton(site);
  b.onclick = function() { setQuery(site); }
}

function sButton(site) {
  var b = commonButton(site);
  b.onclick = function() { setSite(site); }
}

function appendElement(text) {
  var e = document.createElement(text);
          document.body.appendChild(e);
}

function appendText(text) {
  var e = document.createTextNode(text);
          document.body.appendChild(e);
}

function spacer(text) {
  appendElement("br");
  appendElement("hr");
  appendText(text + ": ");
}

function makeQueryCollection(label, arr) {
  spacer(label);
  for ( Query of arr )
    qButton(Query);
}

function makeSiteCollection(label, arr) {
  spacer(label);
  for ( Site of arr )
    sButton(Site);
}
