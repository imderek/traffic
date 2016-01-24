(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Car = (function() {
    function Car() {
      this.update = __bind(this.update, this);
      this.move_along_road = __bind(this.move_along_road, this);
      this.can_move_along_road = __bind(this.can_move_along_road, this);
      this.has_reached_end_of_road = __bind(this.has_reached_end_of_road, this);
      this.has_arrived_at_intersection = __bind(this.has_arrived_at_intersection, this);
      this.next_intersection = __bind(this.next_intersection, this);
      this.leave_road = __bind(this.leave_road, this);
      this.enter_road = __bind(this.enter_road, this);
      this.color = "rgba(39,127,182,1)";
      this.road = null;
      this.x = this.y = 0;
      this.velocity = Math.floor((Math.random() * 3) + 3);
      this.size = 6;
      this.intersection_buffer_distance = 100;
    }

    Car.prototype.enter_road = function(road) {
      this.road = road;
      this.road.cars.push(this);
      this.x = this.road.x_start;
      return this.y = this.road.y_start;
    };

    Car.prototype.leave_road = function() {
      return this.road.cars.pop();
    };

    Car.prototype.next_intersection = function() {
      var buffered_x, buffered_y;
      buffered_x = this.x + this.intersection_buffer_distance;
      buffered_y = this.y + this.intersection_buffer_distance;
      if (this.road.intersection.x >= buffered_x || this.road.intersection.y >= buffered_y) {
        return this.road.intersection;
      }
    };

    Car.prototype.has_arrived_at_intersection = function() {
      if (!this.next_intersection()) {
        return false;
      }
      return (this.x + this.intersection_buffer_distance) >= this.next_intersection().x && (this.y + this.intersection_buffer_distance) >= this.next_intersection().y;
    };

    Car.prototype.has_reached_end_of_road = function() {
      return this.x >= this.road.x_end && this.y >= this.road.y_end;
    };

    Car.prototype.can_move_along_road = function() {
      return !this.has_arrived_at_intersection() || this.next_intersection().active_road === this.road;
    };

    Car.prototype.move_along_road = function() {
      this.angle = Math.atan2(this.road.y_end - this.y, this.road.x_end - this.x);
      this.move_x = Math.cos(this.angle) * this.velocity;
      this.move_y = Math.sin(this.angle) * this.velocity;
      this.x = this.x + this.move_x;
      return this.y = this.y + this.move_y;
    };

    Car.prototype.update = function() {
      if (this.has_reached_end_of_road()) {
        return this.leave_road();
      } else if (this.can_move_along_road()) {
        return this.move_along_road();
      }
    };

    Car.prototype.draw = function() {
      world.canvas.beginPath();
      world.canvas.arc(this.x, this.y, this.size + 7, 0, 2 * Math.PI);
      world.canvas.fillStyle = "#444";
      world.canvas.fill();
      world.canvas.beginPath();
      world.canvas.arc(this.x, this.y, this.size + 2, 0, 2 * Math.PI);
      world.canvas.fillStyle = "#fff";
      world.canvas.fill();
      world.canvas.beginPath();
      world.canvas.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      world.canvas.fillStyle = "rgba(39,127,182,1)";
      world.canvas.fill();
      world.canvas.beginPath();
      world.canvas.arc(this.x, this.y, this.size * 8, 0, 2 * Math.PI);
      world.canvas.fillStyle = "rgba(39,127,182,0.05)";
      return world.canvas.fill();
    };

    return Car;

  })();

}).call(this);

(function() {


}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Intersection = (function() {
    function Intersection(road_a, road_b) {
      this.draw_active = __bind(this.draw_active, this);
      this.draw_stopped = __bind(this.draw_stopped, this);
      this.draw = __bind(this.draw, this);
      this.set_intersection_position = __bind(this.set_intersection_position, this);
      this.toggle = __bind(this.toggle, this);
      this.start_toggle_timer = __bind(this.start_toggle_timer, this);
      this.road_a = road_a;
      this.road_b = road_b;
      this.x = 0;
      this.y = 0;
      this.set_intersection_position(this.road_a, this.road_b);
      this.active_road = road_a;
      this.stopped_roads = [road_b];
      this.start_toggle_timer();
    }

    Intersection.prototype.start_toggle_timer = function() {
      return setInterval((function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this), 4000);
    };

    Intersection.prototype.toggle = function() {
      var currently_active;
      currently_active = this.active_road;
      this.active_road = null;
      this.stopped_roads.push(currently_active);
      return setTimeout((function(_this) {
        return function() {
          _this.active_road = _this.stopped_roads[0];
          return _this.stopped_roads = [currently_active];
        };
      })(this), 1500);
    };

    Intersection.prototype.set_intersection_position = function(road_a, road_b) {
      var a, b, denominator, line1EndX, line1EndY, line1StartX, line1StartY, line2EndX, line2EndY, line2StartX, line2StartY, numerator1, numerator2, result;
      line1StartX = road_a.x_start;
      line1StartY = road_a.y_start;
      line1EndX = road_a.x_end;
      line1EndY = road_a.y_end;
      line2StartX = road_b.x_start;
      line2StartY = road_b.y_start;
      line2EndX = road_b.x_end;
      line2EndY = road_b.y_end;
      denominator = void 0;
      a = void 0;
      b = void 0;
      numerator1 = void 0;
      numerator2 = void 0;
      result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
      };
      denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
      if (denominator === 0) {
        return result;
      }
      a = line1StartY - line2StartY;
      b = line1StartX - line2StartX;
      numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
      numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
      a = numerator1 / denominator;
      b = numerator2 / denominator;
      this.x = line1StartX + (a * (line1EndX - line1StartX));
      return this.y = line1StartY + (a * (line1EndY - line1StartY));
    };

    Intersection.prototype.draw = function() {
      this.draw_stopped();
      if (this.active_road) {
        return this.draw_active();
      }
    };

    Intersection.prototype.draw_stopped = function() {
      var angle, move_x, move_y, new_x, new_y, stopped_road, _i, _len, _ref, _results;
      world.canvas.lineWidth = 4;
      world.canvas.lineCap = "round";
      world.canvas.strokeStyle = "#d24b35";
      world.canvas.beginPath();
      _ref = this.stopped_roads;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        stopped_road = _ref[_i];
        angle = Math.atan2(stopped_road.y_start - this.y, stopped_road.x_start - this.x);
        move_x = Math.cos(angle) * 80;
        move_y = Math.sin(angle) * 80;
        new_x = this.x + move_x;
        new_y = this.y + move_y;
        world.canvas.moveTo(new_x, new_y);
        angle = Math.atan2(this.y - new_y, this.x - new_x);
        move_x = Math.cos(angle) * 60;
        move_y = Math.sin(angle) * 60;
        new_x = new_x + move_x;
        new_y = new_y + move_y;
        world.canvas.lineTo(new_x, new_y);
        world.canvas.stroke();
        angle = Math.atan2(stopped_road.y_end - this.y, stopped_road.x_end - this.x);
        move_x = Math.cos(angle) * 80;
        move_y = Math.sin(angle) * 80;
        new_x = this.x + move_x;
        new_y = this.y + move_y;
        world.canvas.moveTo(new_x, new_y);
        angle = Math.atan2(this.y - new_y, this.x - new_x);
        move_x = Math.cos(angle) * 60;
        move_y = Math.sin(angle) * 60;
        new_x = new_x + move_x;
        new_y = new_y + move_y;
        world.canvas.lineTo(new_x, new_y);
        _results.push(world.canvas.stroke());
      }
      return _results;
    };

    Intersection.prototype.draw_active = function() {
      var angle, move_x, move_y, new_x, new_y;
      world.canvas.lineWidth = 4;
      world.canvas.lineCap = "round";
      world.canvas.strokeStyle = "#83b73e";
      world.canvas.beginPath();
      angle = Math.atan2(this.active_road.y_start - this.y, this.active_road.x_start - this.x);
      move_x = Math.cos(angle) * 80;
      move_y = Math.sin(angle) * 80;
      new_x = this.x + move_x;
      new_y = this.y + move_y;
      world.canvas.moveTo(new_x, new_y);
      angle = Math.atan2(this.active_road.y_end - this.y, this.active_road.x_end - this.x);
      move_x = Math.cos(angle) * 80;
      move_y = Math.sin(angle) * 80;
      new_x = this.x + move_x;
      new_y = this.y + move_y;
      world.canvas.lineTo(new_x, new_y);
      return world.canvas.stroke();
    };

    Intersection.roads_do_intersect = function(road_a, road_b) {
      var a, b, denominator, line1EndX, line1EndY, line1StartX, line1StartY, line2EndX, line2EndY, line2StartX, line2StartY, numerator1, numerator2, result;
      line1StartX = road_a.x_start;
      line1StartY = road_a.y_start;
      line1EndX = road_a.x_end;
      line1EndY = road_a.y_end;
      line2StartX = road_b.x_start;
      line2StartY = road_b.y_start;
      line2EndX = road_b.x_end;
      line2EndY = road_b.y_end;
      denominator = void 0;
      a = void 0;
      b = void 0;
      numerator1 = void 0;
      numerator2 = void 0;
      result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
      };
      denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
      if (denominator === 0) {
        return result;
      }
      a = line1StartY - line2StartY;
      b = line1StartX - line2StartX;
      numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
      numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
      a = numerator1 / denominator;
      b = numerator2 / denominator;
      result.x = line1StartX + (a * (line1EndX - line1StartX));
      result.y = line1StartY + (a * (line1EndY - line1StartY));
      if (a > 0 && a < 1) {
        result.onLine1 = true;
      }
      if (b > 0 && b < 1) {
        result.onLine2 = true;
      }
      return result.onLine1 && result.onLine2;
    };

    return Intersection;

  })();

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Road = (function() {
    function Road(x_start, x_end, y_start, y_end, angle) {
      if (x_start == null) {
        x_start = 100;
      }
      if (x_end == null) {
        x_end = 650;
      }
      if (y_start == null) {
        y_start = 100;
      }
      if (y_end == null) {
        y_end = 100;
      }
      if (angle == null) {
        angle = 0;
      }
      this.events = __bind(this.events, this);
      this.draw = __bind(this.draw, this);
      this.active = true;
      this.cars = [];
      this.x_start = x_start;
      this.x_end = x_end;
      this.y_start = y_start;
      this.y_end = y_end;
      this.id = "" + this.x_start + this.y_start + this.x_end + this.y_end;
      this.el = null;
      this.events();
    }

    Road.prototype.draw = function() {
      world.canvas.lineWidth = 26;
      world.canvas.lineCap = "square";
      world.canvas.strokeStyle = "#444";
      world.canvas.beginPath();
      world.canvas.moveTo(this.x_start, this.y_start);
      world.canvas.lineTo(this.x_end, this.y_end);
      return world.canvas.stroke();
    };

    Road.prototype.events = function() {};

    return Road;

  })();

}).call(this);

(function() {
  $(function() {
    var update_and_draw_world;
    window.world = new World;
    update_and_draw_world = function() {
      window.world.update();
      window.world.draw();
      requestAnimationFrame(update_and_draw_world);
    };
    return requestAnimationFrame(update_and_draw_world);
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.World = (function() {
    function World() {
      this.build_intersections = __bind(this.build_intersections, this);
      this.build_roads = __bind(this.build_roads, this);
      this.canvas_width = 600;
      this.canvas_height = 600;
      this.canvas_element = $("<canvas width='" + this.canvas_width + "' height='" + this.canvas_height + "'></canvas");
      this.canvas = this.canvas_element.get(0).getContext("2d");
      this.canvas_element.prependTo('body');
      this.roads = [];
      this.build_roads();
      this.build_intersections();
    }

    World.prototype.build_roads = function() {
      var x_end, x_start, y_end, y_start;
      this.roads.push(new Road(x_start = 300, x_end = 300, y_start = 50, y_end = 550));
      return this.roads.push(new Road(x_start = 50, x_end = 550, y_start = 300, y_end = 300));
    };

    World.prototype.build_intersections = function() {
      var intersection, road, _i, _len, _ref, _results;
      if (Intersection.roads_do_intersect(this.roads[0], this.roads[1])) {
        intersection = new Intersection(this.roads[0], this.roads[1]);
        _ref = this.roads;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          road = _ref[_i];
          _results.push(window.intersection = road.intersection = intersection);
        }
        return _results;
      }
    };

    World.prototype.update = function() {
      var car, road, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
      _ref = this.roads;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        road = _ref[_i];
        _ref1 = road.cars;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          car = _ref1[_j];
          car.update();
        }
      }
      _ref2 = this.roads;
      _results = [];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        road = _ref2[_k];
        if (road.cars.length === 0) {
          car = new Car;
          _results.push(car.enter_road(road));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    World.prototype.draw = function() {
      var car, road, _i, _j, _len, _len1, _ref, _ref1, _results;
      this.canvas.clearRect(0, 0, this.canvas_width, this.canvas_height);
      _ref = this.roads;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        road = _ref[_i];
        road.draw();
      }
      intersection.draw();
      _ref1 = this.roads;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        road = _ref1[_j];
        _results.push((function() {
          var _k, _len2, _ref2, _results1;
          _ref2 = road.cars;
          _results1 = [];
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            car = _ref2[_k];
            _results1.push(car.draw());
          }
          return _results1;
        })());
      }
      return _results;
    };

    return World;

  })();

}).call(this);
