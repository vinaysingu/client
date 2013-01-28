/*jshint indent:2, curly:true eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true
white:true*/
/*global XT:true, XM:true, Backbone:true, _:true, console:true */

(function () {
  "use strict";

  /**
    @class

    @extends XM.AccountDocument
  */
  XM.TaxAuthority = XM.AccountDocument.extend({
    /** @scope XM.TaxAuthority.prototype */

    recordType: 'XM.TaxAuthority',
    
    documentKey: 'code'

  });
  
  /**
    @class

    @extends XM.Document
  */
  XM.TaxZone = XM.Document.extend({
    /** @scope XM.TaxZone.prototype */

    recordType: 'XM.TaxZone'

  });
  
  // ..........................................................
  // COLLECTIONS
  //

  /**
    @class

    @extends XM.Collection
  */
  XM.TaxZoneCollection = XM.Collection.extend({
    /** @scope XM.TaxZoneCollection.prototype */

    model: XM.TaxZone

  });

}());
