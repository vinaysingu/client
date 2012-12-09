/*jshint bitwise:true, indent:2, curly:true eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true white:true*/
/*global X:true, enyo:true*/

var X = X || {};
X.getCookie = enyo.getCookie;

(function () {
  // note that this maps the global DOCUMENT_HOSTNAME that is later
  // used by the datasource
  var hostname = window.DOCUMENT_HOSTNAME = document.location.hostname;
  var protocol = document.location.protocol;
  var port = document.location.port;
  
  window.relocate = function () {
    if (window.onbeforeunload) {
      // if we've set up a "are you sure you want to leave?" warning, disable that
      // here. Presumably we've already asked if they want to leave.
      // delete window.onbeforeunload; // doesn't work
      window.onbeforeunload = undefined;
    }
    document.location = "%@//%@%@/login".f(protocol, hostname, port? ":%@".f(port): "");
  };
}());
