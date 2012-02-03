// ==========================================================================
// Project:   xTuple Postbooks - Business Management System Framework
// Copyright: ©2011 OpenMFG LLC, d/b/a xTuple
// ==========================================================================
/*globals XT */

sc_require('mixins/core_documents');

/** @class

  (Document your Model here)

  @extends XM.Activity
  @extends XM.Recurrence
  @version 0.2
*/
XM.Project = XM.Activity.extend( XM.Recurrence, XM.CoreDocuments,
    /** @scope XM.Project.prototype */ {

  className: 'XM.Project',

  createPrivilege: 'MaintainPersonalProjects MaintainAllProjects'.w(),
  readPrivilege:   'ViewPersonalProjects ViewAllProjects',
  updatePrivilege: 'MaintainPersonalProjects MaintainAllProjects'.w(),
  deletePrivilege: 'MaintainPersonalProjects MaintainAllProjects'.w(),

  /**
  @type String
  */
  name: SC.Record.attr(String, {
    isRequired: YES
  }),
  
  /**
  @type String
  */
  projectStatus: SC.Record.attr(String, { 
    /** @private */
    defaultValue: function() {
      return XM.Project.CONCEPT;
    }
  }),
  
  /**
  @type SC.DateTime
  */
  startDate: SC.Record.attr(SC.DateTime, { 
    format: '%Y-%m-%d' 
  }),
  
  /**
  @type XM.Account
  */
  dueDate: SC.Record.attr(SC.DateTime, { 
    format: '%Y-%m-%d', 
    isRequired: YES,
  }),
  
  /**
  @type SC.DateTime
  */
  assignDate: SC.Record.attr(SC.DateTime, { 
    format: '%Y-%m-%d' 
  }),
  
  /**
  @type SC.DateTime
  */
  completeDate: SC.Record.attr(SC.DateTime, { 
    format: '%Y-%m-%d' 
  }),
  
  /**
  @type XM.ProjectTask
  */
  tasks: SC.Record.toMany('XM.ProjectTask', {
    isNested: YES,
    inverse:  'project'
  }),
  
  /**
  @type XM.ProjectComment
  */
  comments: XM.Record.toMany('XM.ProjectComment', {
    isNested: YES,
    inverse: 'project'
  }),
  
  // ..........................................................
  // DOCUMENT ASSIGNMENTS
  // 
  
  /**
  @type XM.ProjectContact
  */
  contacts: SC.Record.toMany('XM.ProjectContact', {
    isNested: YES
  }),
    
  /**
  @type XM.ProjectItem
  */
  items: SC.Record.toMany('XM.ProjectItem', {
    isNested: YES
  }),
  
  /**
  @type XM.ProjectFile
  */
  files: SC.Record.toMany('XM.ProjectFile', {
    isNested: YES
  }),
  
  /**
  @type XM.ProjectImage
  */
  images: SC.Record.toMany('XM.ProjectImage', {
    isNested: YES
  }),
  
  /**
  @type XM.ProjectUrl
  */
  urls: SC.Record.toMany('XM.ProjectUrl', {
    isNested: YES
  }),
  
  /**
  @type XM.ProjectProject
  */
  projects: XM.Record.toMany('XM.ProjectProject', {
    isNested: YES
  }),
  
  /* @private */
  _projectsLength: 0,
  
  /* @private */
  _projectsLengthBinding: '.projects.length',
  
  /* @private */
  _projectsDidChange: function() {
    var documents = this.get('documents'),
        projects = this.get('projects');

    documents.addEach(projects);    
  }.observes('projectsLength'),


  // ..........................................................
  // CALCULATED PROPERTIES
  //

  /**
  @field
  @type Number
  */
  budgetedHours: function() {
    //TODO: Write this
    return 0;
  }.property(),

  /**
  @field
  @type Number
  */
  actualHours: function() {
    //TODO: Write this
    return 0;
  }.property(),

  /**
  @field
  @type Number
  */
  balanceHours: function() {
    //TODO: Write this
    return 0;
  }.property(),

  /**
  @field
  @type Number
  */
  budgetedExpenses: function() {
    //TODO: Write this
    return 0;
  }.property(),

  /**
  @field
  @type Number
  */
  actualExpenses: function() {
    //TODO: Write this
    return 0;
  }.property(),

  /**
  @field
  @type Number
  */
  balanceExpenses: function() {
    //var value = this.get('budgetedExpenses') - this.get('actualExpenses');
    return 0;
  }.property(),

});

XM.Project.mixin( /** @scope XM.Project */ {

/**
  Concept status for project.
  
  @static
  @constant
  @type String
  @default P
*/
  CONCEPT: 'P',

/**
  In-Process status for project.
  
  @static
  @constant
  @type String
  @default O
*/
  IN_PROCESS: 'O',

/**
  Completed status for project.
  @static
  @constant
  @type String
  @default C
*/
  COMPLETED: 'C'
  
});