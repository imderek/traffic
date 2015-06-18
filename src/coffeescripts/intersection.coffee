class @Intersection
  constructor: (road_a, road_b) ->
    @road_a = road_a
    @road_b = road_b
    @x = 0
    @y = 0
    @set_intersection_position @road_a, @road_b
    @active_road = road_a
    @stopped_roads = [road_b]
    @start_toggle_timer()

  start_toggle_timer: =>
    setInterval =>
      @toggle()
    , 4000

  toggle: =>
    # stop active road
    currently_active = @active_road
    @active_road = null
    @stopped_roads.push currently_active

    # wait N milliseconds before making new road active
    setTimeout =>
      @active_road = @stopped_roads[0]
      @stopped_roads = [currently_active]
    , 1500

  set_intersection_position: (road_a, road_b) =>
    line1StartX = road_a.x_start
    line1StartY = road_a.y_start
    line1EndX = road_a.x_end
    line1EndY = road_a.y_end
    line2StartX = road_b.x_start
    line2StartY = road_b.y_start
    line2EndX = road_b.x_end
    line2EndY = road_b.y_end

    # if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    denominator = undefined
    a = undefined
    b = undefined
    numerator1 = undefined
    numerator2 = undefined
    result =
      x: null
      y: null
      onLine1: false
      onLine2: false

    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY))
    return result if denominator is 0
    a = line1StartY - line2StartY
    b = line1StartX - line2StartX
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b)
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b)
    a = numerator1 / denominator
    b = numerator2 / denominator
    
    # if we cast these lines infinitely in both directions, they intersect here:
    @x = line1StartX + (a * (line1EndX - line1StartX))
    @y = line1StartY + (a * (line1EndY - line1StartY))


  # ============================================
  # appearance

  draw: =>
    @draw_stopped()
    @draw_active() if @active_road

  draw_stopped: =>
    world.canvas.lineWidth = 4
    world.canvas.lineCap = "round"
    world.canvas.strokeStyle = "#d24b35"
    world.canvas.beginPath()

    for stopped_road in @stopped_roads
      # red line
      angle = Math.atan2(stopped_road.y_start - @y, stopped_road.x_start - @x)
      move_x = Math.cos(angle) * 80
      move_y = Math.sin(angle) * 80
      new_x = @x + move_x
      new_y = @y + move_y
      world.canvas.moveTo new_x, new_y

      angle = Math.atan2(@y - new_y, @x - new_x)
      move_x = Math.cos(angle) * 60
      move_y = Math.sin(angle) * 60
      new_x = new_x + move_x
      new_y = new_y + move_y
      world.canvas.lineTo new_x, new_y
      world.canvas.stroke()

      # red line
      angle = Math.atan2(stopped_road.y_end - @y, stopped_road.x_end - @x)
      move_x = Math.cos(angle) * 80
      move_y = Math.sin(angle) * 80
      new_x = @x + move_x
      new_y = @y + move_y
      world.canvas.moveTo new_x, new_y

      angle = Math.atan2(@y - new_y, @x - new_x)
      move_x = Math.cos(angle) * 60
      move_y = Math.sin(angle) * 60
      new_x = new_x + move_x
      new_y = new_y + move_y
      world.canvas.lineTo new_x, new_y
      world.canvas.stroke()

  draw_active: =>
    world.canvas.lineWidth = 4
    world.canvas.lineCap = "round"
    world.canvas.strokeStyle = "#83b73e"
    world.canvas.beginPath()

    # green line
    angle = Math.atan2(@active_road.y_start - @y, @active_road.x_start - @x)
    move_x = Math.cos(angle) * 80
    move_y = Math.sin(angle) * 80
    new_x = @x + move_x
    new_y = @y + move_y
    world.canvas.moveTo new_x, new_y

    angle = Math.atan2(@active_road.y_end - @y, @active_road.x_end - @x)
    move_x = Math.cos(angle) * 80
    move_y = Math.sin(angle) * 80
    new_x = @x + move_x
    new_y = @y + move_y
    world.canvas.lineTo new_x, new_y
    world.canvas.stroke()

  # ============================================
  # class methods

  @roads_do_intersect: (road_a, road_b) =>
    line1StartX = road_a.x_start
    line1StartY = road_a.y_start
    line1EndX = road_a.x_end
    line1EndY = road_a.y_end
    line2StartX = road_b.x_start
    line2StartY = road_b.y_start
    line2EndX = road_b.x_end
    line2EndY = road_b.y_end

    # if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    denominator = undefined
    a = undefined
    b = undefined
    numerator1 = undefined
    numerator2 = undefined
    result =
      x: null
      y: null
      onLine1: false
      onLine2: false

    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY))
    return result if denominator is 0
    a = line1StartY - line2StartY
    b = line1StartX - line2StartX
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b)
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b)
    a = numerator1 / denominator
    b = numerator2 / denominator
    
    # if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX))
    result.y = line1StartY + (a * (line1EndY - line1StartY))
    
    # if line1 is a segment and line2 is infinite, they intersect if:
    result.onLine1 = true  if a > 0 and a < 1
    
    # if line2 is a segment and line1 is infinite, they intersect if:
    result.onLine2 = true  if b > 0 and b < 1
    
    # if line1 and line2 are segments, they intersect if both of the above are true
    # console.log result
    result.onLine1 and result.onLine2