// ==========================================================================
// Project:   xTuple Postbooks - Business Management System Framework
// Copyright: ©2011 OpenMFG LLC, d/b/a xTuple
// ==========================================================================
/*globals global Postbooks XM XT sc_assert */

Postbooks.PROJECT = SC.State.design({

  enterState: function() {
    Postbooks.LoadSubmodule('Project', "_crm".loc());
  },

  exitState: function() {
    SC.EndEditingTextLayer();
    SC.app.get('ui').popSurface();
  },

  // ACTIONS

  showCRM: function() {
    this.parentState.__movingUp__ = true; // HACK: SC.Statechart will exit/enter our parent state!
    this.gotoState(this.parentState);
  }

  // SUBSTATES

});