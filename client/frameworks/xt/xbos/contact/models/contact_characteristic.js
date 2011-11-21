// ==========================================================================
// Project:   xTuple Postbooks - Business Management System Framework
// Copyright: ©2011 OpenMFG LLC, d/b/a xTuple
// ==========================================================================
/*globals XT */

/** @class

  (Document your Model here)

  @extends XM.CharacteristicAssignment
*/
XM.ContactCharacteristic = XM.CharacteristicAssignment.extend(
/** @scope XM.ContactCharacteristic.prototype */ {

  className: 'XM.ContactCharacteristic',

  /**
  @type XM.Contact
  */
  contact: SC.Record.toOne('XM.Contact', {
    inverse:  'comments',
    isMaster: NO,
  }),
  
}) ;