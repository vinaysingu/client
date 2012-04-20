// ==========================================================================
// Project:   xTuple Postbooks - Business Management System Framework        
// Copyright: ©2012 OpenMFG LLC, d/b/a xTuple                             
// ==========================================================================

/*globals XM */

/**
  @scope XM.CashReceiptDistribution
  @mixin

  This code is automatically generated and will be over-written. Do not edit directly.
*/
XM._CashReceiptDistribution = {
  /** @scope XM.CashReceiptDistribution.prototype */
  
  className: 'XM.CashReceiptDistribution',

  

  // .................................................
  // PRIVILEGES
  //

  privileges: {
    "all": {
      "create": true,
      "read": true,
      "update": true,
      "delete": true
    }
  },

  //..................................................
  // ATTRIBUTES
  //
  
  /**
    @type Number
  */
  guid: SC.Record.attr(Number),

  /**
    @type XM.CashReceipt
  */
  cashReceipt: SC.Record.toOne('XM.CashReceipt', {
    isRequired: true,
    label: '_cashReceipt'.loc()
  }),

  /**
    @type XM.LedgerAccount
  */
  ledgerAccount: SC.Record.toOne('XM.LedgerAccount', {
    isRequired: true,
    label: '_ledgerAccount'.loc()
  }),

  /**
    @type Number
  */
  amount: SC.Record.attr(Number, {
    isRequired: true,
    label: '_amount'.loc()
  }),

  /**
    @type String
  */
  notes: SC.Record.attr(String, {
    label: '_notes'.loc()
  })

};