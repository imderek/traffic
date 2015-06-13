class @Car
  constructor: () ->
    @color = "rgba(39,127,182,1)"
    @road = null
    @x = @y = 0
    @velocity = Math.floor((Math.random() * 3) + 1)
    @size = 6
    @intersection_buffer_distance = 100
    
  enter_road: (road) =>
    @road = road
    @road.cars.push @
    @x = @road.x_start
    @y = @road.y_start
    
  leave_road: =>
    @road.cars.pop()

  next_intersection: =>
    buffered_x = @x + @intersection_buffer_distance
    buffered_y = @y + @intersection_buffer_distance

    if @road.intersection.x >= buffered_x or @road.intersection.y >= buffered_y
      @road.intersection
    
  has_arrived_at_intersection: =>
    return false unless @next_intersection()

    ( @x + @intersection_buffer_distance ) >= @next_intersection().x and
    ( @y + @intersection_buffer_distance ) >= @next_intersection().y
    
  has_reached_end_of_road: =>
    @x >= @road.x_end and
    @y >= @road.y_end
  
  can_move_along_road: =>
    ! @has_arrived_at_intersection() or
    @next_intersection().active_road is @road

  move_along_road: =>
    @angle = Math.atan2(@road.y_end - @y, @road.x_end - @x)
    @move_x = Math.cos(@angle) * @velocity
    @move_y = Math.sin(@angle) * @velocity
    @x = @x + @move_x
    @y = @y + @move_y

  update: =>
    if @has_reached_end_of_road()
      @leave_road()
    else if @can_move_along_road()
      @move_along_road()
    
  draw: ->
    # outer white mask
    world.canvas.beginPath()
    world.canvas.arc @x, @y, @size + 7, 0, 2 * Math.PI
    world.canvas.fillStyle = "#444"
    world.canvas.fill()

    # outer white mask
    world.canvas.beginPath()
    world.canvas.arc @x, @y, @size + 2, 0, 2 * Math.PI
    world.canvas.fillStyle = "#fff"
    world.canvas.fill()
    
    # blue base
    world.canvas.beginPath()
    world.canvas.arc @x, @y, @size, 0, 2 * Math.PI
    world.canvas.fillStyle = "rgba(39,127,182,1)"
    world.canvas.fill()
    
    # # inner white mask
    # world.canvas.beginPath()
    # world.canvas.arc @x, @y, @size - 5, 0, 2 * Math.PI
    # world.canvas.fillStyle = "#fff"
    # world.canvas.fill()
    
    # # point
    # world.canvas.beginPath()
    # world.canvas.arc @x, @y, 2, 0, 2 * Math.PI
    # world.canvas.fillStyle = "rgba(39,127,182,1)"
    # world.canvas.fill()
    
    # large halo
    world.canvas.beginPath()
    world.canvas.arc @x, @y, @size * 8, 0, 2 * Math.PI
    world.canvas.fillStyle = "rgba(39,127,182,0.05)"
    world.canvas.fill()

    # # debug text
    # world.canvas.fillStyle = @color
    # world.canvas.fillText "x: #{@x}", @x + 14, @y + 20
    # world.canvas.fillText "y: #{@y}", @x + 14, @y + 32