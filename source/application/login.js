/*jshint bitwise:true, indent:2, curly:true eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true white:true*/
/*global XT:true, XV:true, enyo:true, console:true, document:true */

(function () {
  // first of 2 types of checks, this being the most obvious test
  //var c = enyo.getCookie("xtsessioncookie"),
  //  h = document.location.hostname,
  //  p = document.location.protocol,
  //  l = document.location.pathname,
  //  noAuthRedirect = "%@//%@/login".f(p,h);
  var cookie = enyo.getCookie("xtsessioncookie");
  var hostname = document.location.hostname;
  var protocol = document.location.protocol;
  var port = document.location.port;
  var path = document.location.pathname;
  var noAuthRedirect = "%@//%@%@/login".f(protocol, hostname, port? ":%@".f(port): "");

  if (path.match(/login/g)) { return; }
  try {
    cookie = JSON.parse(cookie);
    if (!cookie.organization) {
      // the user authenticated but didn't choose a database. They're half-logged-in,
      // and we should force them to login fully
      document.location = noAuthRedirect;
    }
  } catch (err) {
    document.location = noAuthRedirect;
  }
}());
