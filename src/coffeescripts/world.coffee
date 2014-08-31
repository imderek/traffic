class @World
  constructor: () ->
    @canvas_width = $(window).width()
    @canvas_height = $(window).height() - 4
    @fps = 60
    @canvas_element = $("<canvas width='" + @canvas_width + "' height='" + @canvas_height + "'></canvas");
    @canvas = @canvas_element.get(0).getContext("2d")
    @canvas_element.appendTo('body')
    @roads = []
    @build_roads()

  build_roads: =>
    # north to south
    @roads.push new Road(x_start = 210, x_end = 290, y_start = 30, y_end = 650)
    @roads.push new Road(x_start = 380, x_end = 460, y_start = 30, y_end = 650)
    # west to east
    @roads.push new Road(x_start = 50, x_end = 600, y_start = 175, y_end = 175)
    @roads.push new Road(x_start = 70, x_end = 620, y_start = 320, y_end = 320)
    @roads.push new Road(x_start = 90, x_end = 640, y_start = 465, y_end = 465)
  
  update: ->
    # update existing cars
    for road in @roads
      for car in road.cars
        car.update()
    
    # add new car to each road
    for road in @roads
      # each road can only have one car
      # at a time
      if road.cars.length == 0
        car = new Car
        road.cars.push car
        car.enter_road road
    
  draw: ->
    # draw canvas
    @canvas.clearRect 0, 0, @canvas_width, @canvas_height
    # draw roads
    for road in @roads
      road.draw()
    # draw cars
    for road in @roads
      for car in road.cars
        car.draw()