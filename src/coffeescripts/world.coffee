class @World
  constructor: () ->
    @canvas_width = 600 # $(window).width()
    @canvas_height = 600 # $(window).height()
    @fps = 60
    @canvas_element = $("<canvas width='" + @canvas_width + "' height='" + @canvas_height + "'></canvas");
    @canvas = @canvas_element.get(0).getContext("2d")
    @canvas_element.prependTo('body')
    @roads = []
    @build_roads()
    @build_intersections()

  build_roads: =>
    # north to south
    @roads.push new Road(x_start = 300, x_end = 300, y_start = 50, y_end = 550)
    # west to east
    @roads.push new Road(x_start = 50, x_end = 550, y_start = 300, y_end = 300)

  build_intersections: =>
    if Intersection.roads_do_intersect @roads[0], @roads[1]
      intersection = new Intersection @roads[0], @roads[1]
      for road in @roads
        window.intersection = road.intersection = intersection
  
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
        car.enter_road road
    
  draw: ->
    # draw canvas
    @canvas.clearRect 0, 0, @canvas_width, @canvas_height
    # draw roads
    for road in @roads
      road.draw()
    # draw intersection
    intersection.draw()
    # draw cars
    for road in @roads
      for car in road.cars
        car.draw()