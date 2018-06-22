define(['lib/knockout', 'scripts/Param', 'scripts/Skill', 'jquery', 'underscore'],
  function (ko, Param, Skill, $, _) {
    'use strict';
    var Node = function (nodes) {
      var self = this;

      self.skills = ko.observableArray(ko.utils.arrayMap(_.toArray(nodes), function (item) {
	      var skill = new Skill(item);
        return skill;
      }));
    };

    return Node;
  });
