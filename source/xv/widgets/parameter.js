/*jshint indent:2, curly:true eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, trailing:true
white:true*/
/*global enyo:true, XM:true, XT:true, _:true, console:true */

(function () {

  enyo.kind({
    name: "XV.ParameterItem",
    classes: "xv-parameter-item",
    published: {
      value: "",
      label: "",
      attr: "",
      operator: ""
    },
    events: {
      onParameterChange: ""
    },
    handlers: {
      onValueChange: "parameterChanged"
    },
    components: [
      {name: "input", classes: "xv-parameter-item-input"}
    ],
    defaultKind: "XV.InputWidget",
    create: function () {
      this.inherited(arguments);
      this.valueChanged();
      this.labelChanged();
      if (!this.getOperator() && this.defaultKind === "XV.InputWidget") {
        this.setOperator("MATCHES");
      }
    },
    labelChanged: function () {
      this.$.input.setLabel(this.label);
    },
    getParameter: function () {
      var param;
      if (this.getValue()) {
        param = {
          attribute: this.getAttr(),
          operator: this.getOperator(),
          value: this.getValue()
        };
      }
      return param;
    },
    getValue: function () {
      return this.$.input.getValue();
    },
    parameterChanged: function () {
      var inEvent = { value: this.getValue, originator: this };
      this.doParameterChange(inEvent);
      return true; // stop right here
    },
    valueChanged: function () {
      this.$.input.setValue(this.value);
    }
  });

  enyo.kind({
    name: "XV.ParameterWidget",
    kind: "FittableRows",
    defaultKind: "XV.ParameterItem",
    /*
    components: [
      {name: "client", classes: "pullout-toolbar"},
      {fit: true, style: "position: relative;", components: [
        {kind: "Scroller", classes: "enyo-fit"}
      ]}
    ],
    create: function () {
      this.inherited(arguments);
      var i;
      for (i = 0; i < this.items.length; i++) {
        this.$.scroller.createComponent(this.items[i]);
      }
    },
    */
    getParameters: function () {
      var i,
        param,
        params = [];
      for (i = 0; i < this.children.length; i++) {
        param = this.children[i].getParameter();
        if (param) { params.push(param); }
      }
      return params;
    }
  });

}());