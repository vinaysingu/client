/*jshint indent:2, curly:true eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true
white:true*/
/*global XT:true, XM:true, Backbone:true, _:true */

(function () {
  "use strict";

  /**
    @class

    @extends XT.AccountDocument
  */
  XM.Customer = XM.AccountDocument.extend({
    /** @scope XM.Customer.prototype */

    recordType: 'XM.Customer',

    defaults: function () {
      var localCurrency,
          currencyModel;
      for (var i = 0; i < XM.currencies.models.length; i++) {
        currencyModel = XM.currencies.models[i];
        if (currencyModel.attributes.isBase) {
          localCurrency = currencyModel;
        }
      }
      return {
        isActive: true,
        creditStatus: "G",
        currency: localCurrency
      };
    },

    requiredAttributes: [
      "isActive",
      "name",
      "number",
      "customerType",
      "terms",
      "salesRep",
      "backorder",
      "partialShip",
      "discount",
      "balanceMethod",
      "isFreeFormShipto",
      "blanketPurchaseOrders",
      "shipCharge",
      "creditStatus",
      "isFreeFormBillto",
      "usesPurchaseOrders",
      "autoUpdateStatus",
      "autoHoldOrders",
      "preferredSite"
    ],
    
    // ..........................................................
    // METHODS
    //
    
    /**
      Return a matching record id for a passed user `key` and `value`. If none
      found, returns zero.

      @param {String} Property to search on, typically a user key
      @param {String} Value to search for
      @param {Object} Options
      @returns {Object} Receiver
    */
    findExisting: function (key, value, options) {
      var recordType = this.recordType || this.prototype.recordType,
        params = [ recordType, key, value, this.id || -1 ],
        dataSource = options.dataSource || XT.dataSource;
      dataSource.dispatch('XM.Model', 'findExisting', params, options);
      XT.log("XM.Model.findExisting for: " + recordType);
      return this;
    }

  });

  /**
    @class

    @extends XM.Comment
  */
  XM.CustomerComment = XM.Comment.extend({
    /** @scope XM.CustomerComment.prototype */

    recordType: 'XM.CustomerComment',

    sourceName: 'C'

  });

  /**
    @class

    @extends XM.CharacteristicAssignment
  */
  XM.CustomerCharacteristic = XM.CharacteristicAssignment.extend({
    /** @scope XM.CustomerCharacteristic.prototype */

    recordType: 'XM.CustomerCharacteristic'

  });

  /**
    @class

    @extends XM.Model
  */
  XM.CustomerCustomer = XM.Model.extend({
    /** @scope XM.CustomerCustomer.prototype */

    recordType: 'XM.CustomerCustomer',

    isDocumentAssignment: true

  });

  /**
    @class

    @extends XM.Model
  */
  XM.CustomerContact = XM.Model.extend({
    /** @scope XM.CustomerContact.prototype */

    recordType: 'XM.CustomerContact',

    isDocumentAssignment: true

  });
  
  /**
    @class

    @extends XM.Model
  */
  XM.CustomerGroup = XM.Model.extend({
    /** @scope XM.CustomerGroup.prototype */
    
    recordType: 'XM.CustomerGroup',
    
    documentKey: 'name'
    
  });

  /**
    @class

    @extends XM.Model
  */
  XM.CustomerItem = XM.Model.extend({
    /** @scope XM.CustomerItem.prototype */

    recordType: 'XM.CustomerItem',

    isDocumentAssignment: true

  });

  /**
    @class

    @extends XM.Model
  */
  XM.CustomerFile = XM.Model.extend({
    /** @scope XM.CustomerFile.prototype */

    recordType: 'XM.CustomerFile',

    isDocumentAssignment: true

  });

  /**
    @class

    @extends XM.Model
  */
  XM.CustomerUrl = XM.Model.extend({
    /** @scope XM.CustomerUrl.prototype */

    recordType: 'XM.CustomerUrl',

    isDocumentAssignment: true

  });

  /**
    @class

    @extends XM.Model
  */
  XM.CustomerShipto = XM.Document.extend({
    /** @scope XM.CustomerShipto.prototype */

    recordType: 'XM.CustomerShipto',
    
    requiredAttributes: [
      "isActive",
      "name",
      "number"
    ],
    
    // ..........................................................
    // METHODS
    //

    initialize: function () {
      XM.Document.prototype.initialize.apply(this, arguments);
      this.on('change:customer', this.customerDidChange);
    },

    customerDidChange: function (model, value, options) {
      var status = this.getStatus(),
          customer = this.get("customer"),
          K = XM.Model;
          
      if (customer && status === K.READY_NEW) {
        var shiptosCollection = customer.get("shiptos"),
            numberArray = [];
        //map the number attr of each model in the shiptosCollection to numberArray
        numberArray = _.map(shiptosCollection.models, function (m) {return m.get("number"); });
        /* The purpose of the next few lines is to automatically find the next integer number for the new shipto.
            Sticking a + sign in front of a string will return the number version of the string as long as the
            string contains only numbers.  If it contains non-numeric characters, it will return NaN (not a number).
            For example, +"5" will return 5.  But +"shipto5" would return NaN.  So this while loop will continue to
            loop as long as the string numberArray[i] contains only numeric characters.
        */
        numberArray.sort();
        var i = 0,
            j = 0;
        while (!isNaN(+numberArray[i])) {
          i++;
          j = numberArray[i];
        }
        this.set("number", j + 1);
        
        this.set("shipZone", customer.get("shipZone"));
        this.set("taxZone", customer.get("taxZone"));
        this.set("shipVia", customer.get("shipVia"));
        this.set("shipCharge", customer.get("shipCharge"));
      }
    }

  });

  /**
    @class

    @extends XM.Model
  */
  XM.CustomerType = XM.Document.extend({
    /** @scope XM.CustomerType.prototype */

    recordType: 'XM.CustomerType',

    documentKey: 'code'

  });

  /**
    @class

    @extends XM.Info
  */
  XM.CustomerRelation = XM.Info.extend({
    /** @scope XM.CustomerRelation.prototype */

    recordType: 'XM.CustomerRelation',

    editableModel: 'XM.Customer',

    descriptionKey: "name"

  });

  /**
    @class

    @extends XM.Model
  */
  XM.ShipCharge = XM.Document.extend({
    /** @scope XM.CustomerCharge.prototype */

    recordType: 'XM.ShipCharge',

    documentKey: 'name'

  });
  
  /**
    @class

    @extends XM.Model
  */
  XM.ShippingForm = XM.Document.extend({
    /** @scope */

    recordType: 'XM.ShippingForm',

    documentKey: 'name'

  });

  /**
    @class

    @extends XM.Model
  */
  XM.ShipVia = XM.Document.extend({
    /** @scope XM.CustomerVia.prototype */

    recordType: 'XM.ShipVia',

    documentKey: 'code'

  });

  /**
    @class

    @extends XM.Model
  */
  XM.ShipZone = XM.Document.extend({
    /** @scope XM.ShipZone.prototype */

    recordType: 'XM.ShipZone',

    documentKey: 'name'

  });

  // ..........................................................
  // COLLECTIONS
  //

  /**
    @class

    @extends XM.Collection
  */
  XM.CustomerRelationCollection = XM.Collection.extend({
    /** @scope XM.CustomerRelationCollection.prototype */

    model: XM.CustomerRelation

  });

  /**
    @class

    @extends XM.Collection
  */
  XM.CustomerTypeCollection = XM.Collection.extend({
    /** @scope XM.CustomerTypeCollection.prototype */

    model: XM.CustomerType

  });

  /**
    @class

    @extends XM.Collection
  */
  XM.ShipViaCollection = XM.Collection.extend({
    /** @scope XM.ShipViaCollection.prototype */

    model: XM.ShipVia

  });

  /**
    @class

    @extends XM.Collection
  */
  XM.ShipChargeCollection = XM.Collection.extend({
    /** @scope XM.ShipChargeCollection.prototype */

    model: XM.ShipCharge

  });
  
  /**
    @class

    @extends XM.Collection
  */
  XM.ShippingFormCollection = XM.Collection.extend({
    /** @scope XM.ShippingFormCollection.prototype */

    model: XM.ShippingForm

  });

  /**
    @class

    @extends XM.Collection
  */
  XM.ShipZoneCollection = XM.Collection.extend({
    /** @scope XM.ShipZoneCollection.prototype */

    model: XM.ShipZone

  });

}());
