/*jshint bitwise:true, indent:2, curly:true eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true white:true*/
/*global XT:true, XM:true, XV:true, _:true, window: true, enyo:true, Globalize:true*/

(function () {

  // ..........................................................
  // CONTACT
  //

  enyo.kind({
    name: "XV.ContactListRelations",
    kind: "XV.ListRelations",
    orderBy: [
      {attribute: "lastName"},
      {attribute: "firstName"},
      {attribute: "primaryEmail"}
    ],
    parentKey: "account",
    components: [
      {kind: "XV.ListItem", components: [
        {kind: "FittableColumns", components: [
          {kind: "XV.ListColumn", classes: "first", components: [
            {kind: "FittableColumns", components: [
              {kind: "FittableColumns", components: [
                {kind: "XV.ListAttr", attr: "firstName",
                  formatter: "formatFirstName"},
                {kind: "XV.ListAttr", attr: "lastName", fit: true, classes: "bold",
                  style: "padding-left: 0px;"}
              ]},
              {kind: "XV.ListAttr", attr: "phone", fit: true, classes: "right"}
            ]},
            {kind: "FittableColumns", components: [
              {kind: "XV.ListAttr", attr: "jobTitle",
                placeholder: "_noJobTitle".loc()},
              {kind: "XV.ListAttr", attr: "primaryEmail", ontap: "sendMail",
                classes: "right hyperlink", fit: true}
            ]}
          ]}
        ]}
      ]}
    ],
    formatFirstName: XV.ContactList.prototype.formatFirstName,
    sendMail: XV.ContactList.prototype.sendMail
  });

  // ..........................................................
  // PROJECT
  //

  enyo.kind({
    name: "XV.ProjectTaskListRelations",
    kind: "XV.ListRelations",
    orderBy: [
      {attribute: "number"}
    ],
    parentKey: "project",
    components: [
      {kind: "XV.ListItem", components: [
        {kind: "FittableColumns", components: [
          {kind: "XV.ListColumn", classes: "first", components: [
            {kind: "FittableColumns", components: [
              {kind: "XV.ListAttr", attr: "number", classes: "bold"},
              {kind: "XV.ListAttr", attr: "dueDate", fit: true,
                formatter: "formatDueDate",
                classes: "right"}
            ]},
            {kind: "XV.ListAttr", attr: "name"}
          ]},
          {kind: "XV.ListColumn", classes: "third",
            components: [
            {kind: "XV.ListAttr", attr: "getProjectStatusString"},
            {kind: "XV.ListAttr", attr: "owner.username"}
          ]},
          {kind: "XV.ListColumn", style: "width: 80;",
            components: [
            {content: "_budgeted".loc() + ":", classes: "xv-list-attr",
              style: "text-align: right;"},
            {content: "_actual".loc() + ":", classes: "xv-list-attr",
              style: "text-align: right;"},
            {content: "_balance".loc() + ":", classes: "xv-list-attr",
              style: "text-align: right;"}
          ]},
          {kind: "XV.ListColumn", classes: "money", components: [
            {kind: "XV.ListAttr", attr: "budgetedExpenses",
              classes: "text-align-right", formatter: "formatExpenses"},
            {kind: "XV.ListAttr", attr: "actualExpenses",
              classes: "text-align-right", formatter: "formatExpenses"},
            {kind: "XV.ListAttr", attr: "balanceExpenses",
              classes: "text-align-right", formatter: "formatBalanceExpenses"}
          ]},
          {kind: "XV.ListColumn", classes: "money", fit: true, components: [
            {kind: "XV.ListAttr", attr: "budgetedHours",
              classes: "text-align-right", formatter: "formatHours"},
            {kind: "XV.ListAttr", attr: "actualHours",
              classes: "text-align-right", formatter: "formatHours"},
            {kind: "XV.ListAttr", attr: "balanceHours",
              classes: "text-align-right", formatter: "formatBalanceHours"}
          ]}
        ]}
      ]}
    ],
    formatBalanceExpenses: function (value, view, model) {
      var actual = model.get('actualExpenses'),
        budget = model.get('budgetedExpenses');
      return this.formatExpenses(budget - actual, view);
    },
    formatBalanceHours: function (value, view, model) {
      var actual = model.get('actualHours'),
        budget = model.get('budgetedHours');
      return this.formatHours(budget - actual, view);
    },
    formatDueDate: XV.ProjectList.prototype.formatDueDate,
    formatHours: XV.ProjectList.prototype.formatHours,
    formatExpenses: XV.ProjectList.prototype.formatExpenses
  });

}());


// ..........................................................
// INCIDENT
//

enyo.kind({
  name: "XV.IncidentListRelations",
  kind: "XV.ListRelations",
  orderBy: [
    {attribute: 'number', descending: true}
  ],
  //parentKey: "account", to be defined by subkind
  workspace: "XV.IncidentWorkspace",
  components: [
    {kind: "XV.ListItem", components: [
      {kind: "FittableColumns", components: [
        {kind: "XV.ListColumn", classes: "first", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListAttr", attr: "number", classes: "bold"},
            {kind: "XV.ListAttr", attr: "getIncidentStatusString", fit: true},
            {kind: "XV.ListAttr", attr: "updated", formatter: "formatDate",
              classes: "right"}
          ]},
          {kind: "XV.ListAttr", attr: "description"}
        ]}
      ]}
    ]}
  ],
  formatDate: XV.IncidentList.prototype.formatDate
});


// ..........................................................
// INCIDENT HISTORY
//

enyo.kind({
  name: "XV.IncidentHistoryListRelations",
  kind: "XV.ListRelations",
  orderBy: [
    {attribute: "lastName"},
    {attribute: "firstName"},
    {attribute: "primaryEmail"}
  ],
  parentKey: "history",
  components: [
    {kind: "XV.ListItem", components: [
      {kind: "FittableRows", components: [
        {kind: "XV.ListColumn", classes: "first", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListAttr", attr: "createdBy"},
            {kind: "XV.ListAttr", attr: "created", fit: true, classes: "right"}
          ]},
          {kind: "FittableColumns", components: [
            {kind: "XV.ListAttr", attr: "description"}
          ]}
        ]}
      ]}
    ]}
  ]
});
