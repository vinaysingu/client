/*jshint indent:2, curly:true eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true
white:true*/
/*global XT:true, XM:true, Backbone:true, _:true, console:true */

(function () {
  "use strict";

  /**
    @class

    @extends XM.Document
  */
  XM.Terms = XM.Document.extend({
    /** @scope XM.Terms.prototype */

    recordType: 'XM.Terms',
    
    documentKey: 'code'

  });
  
  /**
    @class

    @extends XM.Collection
  */
  XM.TermsCollection = XM.Collection.extend({
    /** @scope XM.TermsCollection.prototype */

    model: XM.Terms

  });

}());
