(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Car = (function() {
    function Car() {
      this.move_along_road = __bind(this.move_along_road, this);
      this.can_move_forward = __bind(this.can_move_forward, this);
      this.has_reached_end_of_road = __bind(this.has_reached_end_of_road, this);
      this.leave_road = __bind(this.leave_road, this);
      this.enter_road = __bind(this.enter_road, this);
      this.update = __bind(this.update, this);
      this.active = true;
      this.color = "rgba(39,127,182,1)";
      this.road = null;
      this.x = this.y = 0;
      this.velocity = Math.floor((Math.random() * 4) + 1);
      this.size = 15;
    }

    Car.prototype.update = function() {
      if (this.has_reached_end_of_road()) {
        return this.leave_road();
      } else if (this.can_move_forward()) {
        return this.move_along_road();
      }
    };

    Car.prototype.enter_road = function(road) {
      this.road = road;
      this.x = this.road.x_start;
      return this.y = this.road.y_start;
    };

    Car.prototype.leave_road = function() {
      this.active = false;
      return this.road.cars.pop();
    };

    Car.prototype.has_reached_end_of_road = function() {
      return this.x >= this.road.x_end && this.y >= this.road.y_end;
    };

    Car.prototype.can_move_forward = function() {
      return this.active && this.road.active;
    };

    Car.prototype.move_along_road = function() {
      var angle, x, y;
      angle = Math.atan2(this.road.y_end - this.y, this.road.x_end - this.x);
      x = Math.cos(angle) * this.velocity;
      y = Math.sin(angle) * this.velocity;
      this.x = this.x + x;
      return this.y = this.y + y;
    };

    Car.prototype.draw = function() {
      world.canvas.beginPath();
      world.canvas.arc(this.x, this.y, this.size + 4, 0, 2 * Math.PI);
      world.canvas.fillStyle = "#fff";
      world.canvas.fill();
      world.canvas.beginPath();
      world.canvas.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      world.canvas.fillStyle = "rgba(39,127,182,1)";
      world.canvas.fill();
      world.canvas.beginPath();
      world.canvas.arc(this.x, this.y, this.size - 5, 0, 2 * Math.PI);
      world.canvas.fillStyle = "#fff";
      world.canvas.fill();
      world.canvas.beginPath();
      world.canvas.arc(this.x, this.y, 2, 0, 2 * Math.PI);
      world.canvas.fillStyle = "rgba(39,127,182,1)";
      world.canvas.fill();
      world.canvas.beginPath();
      world.canvas.arc(this.x, this.y, this.size * 3.5, 0, 2 * Math.PI);
      world.canvas.fillStyle = "rgba(39,127,182,0.05)";
      return world.canvas.fill();
    };

    return Car;

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
      this.events();
    }

    Road.prototype.draw = function() {
      world.canvas.lineWidth = 8;
      world.canvas.lineCap = "round";
      world.canvas.strokeStyle = "#888";
      world.canvas.beginPath();
      world.canvas.moveTo(this.x_start, this.y_start);
      world.canvas.lineTo(this.x_end, this.y_end);
      return world.canvas.stroke();
    };

    Road.prototype.events = function() {
      return $("canvas").on("click", (function(_this) {
        return function() {
          return _this.active = _this.active ? false : true;
        };
      })(this));
    };

    return Road;

  })();

}).call(this);

(function() {
  $(function() {
    window.world = new World;
    return setInterval(function() {
      world.update();
      return world.draw();
    }, 1000 / world.fps);
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.World = (function() {
    function World() {
      this.build_roads = __bind(this.build_roads, this);
      this.canvas_width = $(window).width();
      this.canvas_height = $(window).height() - 4;
      this.fps = 60;
      this.canvas_element = $("<canvas width='" + this.canvas_width + "' height='" + this.canvas_height + "'></canvas");
      this.canvas = this.canvas_element.get(0).getContext("2d");
      this.canvas_element.appendTo('body');
      this.roads = [];
      this.build_roads();
    }

    World.prototype.build_roads = function() {
      var x_end, x_start, y_end, y_start;
      this.roads.push(new Road(x_start = 210, x_end = 290, y_start = 30, y_end = 650));
      this.roads.push(new Road(x_start = 380, x_end = 460, y_start = 30, y_end = 650));
      this.roads.push(new Road(x_start = 550, x_end = 630, y_start = 30, y_end = 650));
      this.roads.push(new Road(x_start = 720, x_end = 800, y_start = 30, y_end = 650));
      this.roads.push(new Road(x_start = 50, x_end = 900, y_start = 175, y_end = 175));
      this.roads.push(new Road(x_start = 70, x_end = 920, y_start = 330, y_end = 330));
      return this.roads.push(new Road(x_start = 90, x_end = 940, y_start = 485, y_end = 485));
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
          road.cars.push(car);
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
