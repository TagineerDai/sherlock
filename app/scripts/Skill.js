define(['lib/knockout', 'scripts/Param','scripts/Utils'], function (ko, Param) {
  'use strict';

  var Skill = function (_e) {
    var e = _e || {};
    var self = this;

    self.id = e.id || 0;
    self.title = e.title || 'Unknown Skill';
    self.description = e.description;
    self.maxPoints = e.maxPoints || 1;
    self.points = ko.observable(e.points || 0);

    if (e.params !== undefined) {
      self.params = ko.utils.arrayMap(e.params, function (item) {
        return new Param(item);
      });

    } else {
      self.params = {
        k: None,
        v: None
      };
    }
    self.dependencies = ko.observableArray([]);
    self.dependents = ko.observableArray([]);

    //Computed values
    self.hasDependencies = ko.computed(function () {
      return self.dependencies().length > 0;
    });

    self.dependenciesFulfilled = ko.computed(function () {
      var result = true;
      ko.utils.arrayForEach(self.dependencies(), function (item) {
        if (!item.hasPoints()) {
          result = false;
        }
      });
      return result;
    });
    
    self.dependentsUsed = ko.computed(function () {
      var result = false;
      ko.utils.arrayForEach(self.dependents(), function (item) {
        if (item.hasPoints()) {
          result = true;
        }
      });
      return result;
    });
    
    self.hasPoints = ko.computed(function () {
      return self.points() > 0;
    });

    self.hasMultiplePoints = ko.computed(function () {
      return self.points() > 1;
    });
    
    self.hasMaxPoints = ko.computed(function () {
      return self.points() >= self.maxPoints;
    });
    
    self.canAddPoints = ko.computed(function () {
      return self.dependenciesFulfilled() && !self.hasMaxPoints();
    });
    
    self.canRemovePoints = ko.computed(function () {
      return (self.dependentsUsed() && self.hasMultiplePoints()) || (!self.dependentsUsed() && self.hasPoints());
    });
    
    self.addPoint = function () {
      if (self.canAddPoints()) {
        self.points(self.points() + 1);
      }
    };
    
    self.removePoint = function () {
      if (self.canRemovePoints()) {
        self.points(self.points() - 1);
      }
    };
  };

  return Skill;
});


