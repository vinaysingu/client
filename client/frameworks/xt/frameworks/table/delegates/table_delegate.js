
/*globals XT */

sc_require("views/row");
sc_require("views/column");
sc_require("controllers/table_controller");

/** @delegate

*/
XT.TableDelegate = {
  

  //.....................................
  // Properties
  //

  /** @property
    Walk like a duck?
  */
  isTableDelegate: YES,  

  //.....................................
  // Methods
  // 

  /** @private */
  initMixin: function() {
    var tc = this.get("controllerClass"),
        qos = this.get("queryOnStart");
    tc = tc.create({ table: this });
    this.set("controller", tc);
    if(qos) tc.query();
    XT.TABLEME = this;
  },

  /** @private */
  scrollTarget: function() {
    return "#"+this.get("tableId")+"-container";
  }.property("tableId").cacheable(),

  /** @private */
  render: function(context) {
    
    var content = this.get("content"),
        msg = this.get("_message"),
        columns = this.get("columns");
    
   //if(!columns || columns.length <= 0) {
   //  this.warn("No columns defined!");
   //  msg = "No columns defined for table!";
   //}
    
    // if there is a message set, use that to display and be done
    if(msg) {
      context.begin("div").addClass("no-content").push(msg).end();
      this.set("_message", null);
      return;
    }

    // for occassions when there is not content, just present a message
    // and return
    if(!content || content.get("length") <= 0 || SC.none(content))
      return context.begin("div").addClass("no-content").push("No content to display").end();

    // grab some variables
    var tid = this.get("tableId"),
        cid = tid+"-container",
        len = content.get("length"),
        i = 0;
    
    // TEMPORARY HACK!!!!!!!
    len = len > 100 ? 100 : len;    
        
    // table container begin
    context.push('<div id='+cid+' class="container">');
    
    // time to render the rows by passing them to the column renderer(s)
    for(; i<len; ++i) this.renderRow(i, content.objectAt(i), context);

    // table container end
    context.push('</div>');
  },

  /** @private */
  update: function(jquery) {
 
    //.........................
    // SELECTION
    //
    
    {
      $(".selected", jquery).each(function(d, sub) { $(sub).removeClass("selected"); });
      var skid = this.getPath("controller.selection.firstObject.content.storeKey");
      if(skid) {
        var row = $("div[skid='"+skid+"']");
        if(row && !$(row).hasClass("selected")) row.addClass("selected");
      }
    }
  },
  
  /** @private */
  renderRow: function(i, content, context) {
    var tc = XT.RowTemplate, 
        tn = this.get("rowTemplate"),
        cvs = this.get("childViews");
    if(cvs && cvs[i]) return cvs[i].set("content", content);
    tc = this.createChildView(tc, { templateName: tn, content: content, table: this });
    tc.render(context);
  },
    
} ;

XT.DEFAULT_ROW_TEMPLATE = "default_row";