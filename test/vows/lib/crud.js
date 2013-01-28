/*jshint indent:2, curly:true eqeqeq:true, immed:true, latedef:true, 
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true
white:true*/
/*global XT:true, _:true, console:true, XM:true, Backbone:true, require:true, XVOWS:true */

(function () {
  "use strict";
 
  XVOWS = _.extend(XVOWS, {

    /**
      Creates a working model and automatically checks state
      is `READY_NEW` and a valid `id` immediately afterward.

      Note: This function assumes the `id` is fetched automatically.
      For models with manually created ids such as 'XM.UserAccount',
      create a topic manually.

      @param {String|Object} Model
      @param {Object} Vows
    */
    create: function (model, vows) {
      vows = vows || {};
      var context = {
        topic: function () {
          var that = this,
            timeoutId,
            Klass,
            auto_regex = XM.Document.AUTO_NUMBER + "|" + XM.Document.AUTO_OVERRIDE_NUMBER,
            callback = function (model, value) {
              if (model instanceof XM.Document && model.numberPolicy.match(auto_regex)) {
                // Check that the AUTO...NUMBER property has been set.
                if (model.get(model.documentKey) && model.id) {
                  clearTimeout(timeoutId);
                  model.off('change:' + model.documentKey, callback);
                  model.off('change:id', callback);
                  that.callback(null, model);
                }
              } else {
                clearTimeout(timeoutId);
                model.off('change:id', callback);
                that.callback(null, model);
              }
            };

          if (typeof model === 'string') {
            Klass = Backbone.Relational.store.getObjectByName(model);
            model = new Klass();
          }
          model.on('change:id', callback);
          // Add an event handler when using a model with an AUTO...NUMBER.
          if (model instanceof XM.Document && model.numberPolicy.match(auto_regex)) {
            model.on('change:' + model.documentKey, callback);
          }
          model.initialize(null, {isNew: true});

          // If we don't hear back, keep going
          timeoutId = setTimeout(function () {
            console.log("timeout was reached");
            that.callback(null, model);
          }, XVOWS.wait);
        },
        'Status is `READY_NEW`': function (model) {
          assert.equal(model.getStatusString(), 'READY_NEW');
        },
        'ID is valid': function (model) {
          assert.isNumber(model.id);
        }
      };

      // Add in any other passed vows
      _.extend(context, vows);
      return context;
    },

    /**
      Saves the working model and automatically checks state
      is `READY_CLEAN` immediately afterward.

      @param {String|Object} Model
      @param {Object} Vows
    */
    save: function (model, vows) {
      "use strict";
      vows = vows || {};
      var context = {
        topic: function () {
          var that = this,
            timeoutId,
            callback = function () {
              var status = model.getStatus(),
                K = XM.Model;
                console.log("status is");
                console.log(model.getStatusString());
                console.log("record type is");
                console.log(model.recordType);
              if (status === K.READY_CLEAN) {
                clearTimeout(timeoutId);
                model.off('statusChange', callback);
                that.callback(null, model);
              }
            };
          model.on('statusChange', callback);
          model.save();

          // If we don't hear back, keep going
          timeoutId = setTimeout(function () {
            console.log("timeout was reached");
            that.callback(null, model);
          }, XVOWS.wait);
        },
        'Status is `READY_CLEAN`': function (model) {
          assert.equal(model.getStatusString(), 'READY_CLEAN');
        }
      };

      // Add in any other passed vows
      _.extend(context, vows);
      return context;
    },

    /**
      Check before updating the working model that the state is `READY_CLEAN`.

      @param {String|Object} Model
      @param {Object} Vows
    */
    update: function (model, vows) {
      vows = vows || {};
      var context = {
        topic: function () {
          return model;
        },
        'Status is `READY_CLEAN`': function (model) {
          assert.equal(model.getStatusString(), 'READY_CLEAN');
        }
      };

      // Add in any other passed vows
      _.extend(context, vows);
      return context;
    },

    /**
      Destorys the working model and automatically checks state
      is `DESTROYED_CLEAN` immediately afterward.

      @param {Object} Vows
    */
    destroy: function (model, vows, obj) {
      "use strict";
      vows = vows || {};
      var context = {
        topic: function () {
          var that = this,
            timeoutId,
            callback = function () {
              var status = model.getStatus(),
                K = XM.Model;
              if (status === K.DESTROYED_CLEAN) {
                clearTimeout(timeoutId);
                model.off('statusChange', callback);
                that.callback(null, model);
              }
            };
          model.on('statusChange', callback);
          model.destroy();

          // If we don't hear back, keep going
          timeoutId = setTimeout(function () {
            console.log("timeout was reached");
            that.callback(null, model);
          }, XVOWS.wait);
        },
        'Status is `DESTROYED_CLEAN`': function (model) {
          assert.equal(model.getStatusString(), 'DESTROYED_CLEAN');
        }
      };
      // Add in any other passed vows
      _.extend(context, vows);
      return context;
    }
  });
  
}());