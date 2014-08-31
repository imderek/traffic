class @Car
  constructor: () ->
    @active = true
    @color = "rgba(39,127,182,1)"
    @road = null
    @x = @y = 0
    @velocity = Math.floor((Math.random() * 4) + 1)
    @size = 15
    
  enter_road: (road) =>
    @road = road
    @x = @road.x_start
    @y = @road.y_start
    
  leave_road: =>
    @active = false
    @road.cars.pop()
    console.log "leaving road"
    
  has_reached_end_of_road: =>
    @x >= @road.x_end and
    @y >= @road.y_end

  update: =>
    if @has_reached_end_of_road()
        @leave_road()
    else if @can_move_forward()
        @move_along_road()
  
  can_move_forward: =>
    @active and @road.active

  move_along_road: =>
    angle = Math.atan2(@road.y_end - @y, @road.x_end - @x)
    x = Math.cos(angle) * @velocity
    y = Math.sin(angle) * @velocity
    @x = @x + x
    @y = @y + y
    
  draw: ->
    # outer white mask
    world.canvas.beginPath()
    world.canvas.arc @x, @y, @size + 4, 0, 2 * Math.PI
    world.canvas.fillStyle = "#fff"
    world.canvas.fill()
    
    # blue base
    world.canvas.beginPath()
    world.canvas.arc @x, @y, @size, 0, 2 * Math.PI
    world.canvas.fillStyle = "rgba(39,127,182,1)"
    world.canvas.fill()
    
    # inner white mask
    world.canvas.beginPath()
    world.canvas.arc @x, @y, @size - 5, 0, 2 * Math.PI
    world.canvas.fillStyle = "#fff"
    world.canvas.fill()
    
    # point
    world.canvas.beginPath()
    world.canvas.arc @x, @y, 2, 0, 2 * Math.PI
    world.canvas.fillStyle = "rgba(39,127,182,1)"
    world.canvas.fill()
    
    # large halo
    world.canvas.beginPath()
    world.canvas.arc @x, @y, @size * 3.5, 0, 2 * Math.PI
    world.canvas.fillStyle = "rgba(39,127,182,0.05)"
    world.canvas.fill()