ig.module
(
	'game.entities.base'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityBase = ig.Entity.extend(
	{
		_waypoints: [],
		_current_waypoint: null,
		_move: { x: 0, y: 0 },
		_dir: 1,
		_step: .7,

		_clicked: false,

		blocked: false,
		can_move: true,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);
		},

		talk: function()
		{
			this.currentAnim = this.anims.talk;
			this.can_move = false;
		},

		talk_end: function()
		{
			this.idle();
			this.can_move = true;
		},

		cutscene_begin: function()
		{
			this.blocked = true;
		},

		cutscene_end: function()
		{
			this.blocked = false;
		},

		dialog_begin: function()
		{
			this._current_waypoint = null;
			this.blocked = true;
			this.can_move = false;
			this.idle();
		},

		dialog_end: function()
		{
			this.blocked = false;
			this.talk_end();
		},

		idle: function()
		{
			this.currentAnim = this.anims.idle;
		},

		walk: function()
		{
			this.currentAnim = this.anims.walk;			
		},

		move_to: function(x, y, anim)
		{
			// Move directly to position, clear waypoints
			this._waypoints = [];
			this._current_waypoint = null;
			this.add_waypoint(x, y, anim);
		},

		add_waypoint: function(x, y, anim)
		{
			// Add Waypoint to movement, substract height and half width to center pos on feet
			this._waypoints.push({x: x-this.size.x*0.5, y: y-this.size.y, anim: (anim ? anim : 'walk'), started: false});
		},

		update: function()
		{
			if (!this._current_waypoint)
				this._current_waypoint = this._waypoints.shift();

			if (this.can_move && this._current_waypoint)
			{
				// CHeck if new wp
				if (!this._current_waypoint.started)
				{
					this._current_waypoint.started = true;
					// What did I planed this for???
				}

				// Set animation, may have been interrupted
				this.currentAnim = this.anims[this._current_waypoint.anim];

				// Move player towards this position
				this._move.x = this._current_waypoint.x - this.pos.x;
				this._move.y = this._current_waypoint.y - this.pos.y;
				var n = Math.sqrt(this._move.x*this._move.x + this._move.y*this._move.y);
				this._move.x /= n;
				this._move.y /= n;

				this._dir = (this._move.x < 0) ? -1 : 1;

				this.pos.x += this._move.x * this._step;
				this.pos.y += this._move.y * this._step;

				if (this._is_in_area(this.pos.x, this.pos.y, this._current_waypoint.x, this._current_waypoint.y, 2, 2))
				{
					this._current_waypoint = null;
					this.idle();
				}
			}

			if (this._dir < 0)
				this.currentAnim.flip.x = true;
			else
				this.currentAnim.flip.x = false;

			if (this != global.player && !global.player.blocked && ig.input.pressed('click'))
			{
				if ((ig.input.mouse.x >= this.pos.x && ig.input.mouse.x <= this.pos.x + this.size.x)
					&& (ig.input.mouse.y >= this.pos.y && ig.input.mouse.y <= this.pos.y + this.size.y))
				{
					global.player.move_to(this.pos.x+this.size.x*0.5, this.pos.y+this.size.y);
					global.player.blocked = true;	
					this.clicked();
				}
			}	

			if (this._clicked)
			{
				if (global.player.is_in_area(this.pos.x+16, this.pos.y+32, 32, 64))
				{

					if (global.player.item_selected >= 0)
						this.clicked_with_item(global.player.item_selected);
					else if (this.react)
						this.react();
					
					global.player.blocked = false;
					this._clicked = false;
				}
			}

			this.parent();
		},

		_is_in_area: function(x1, y1, x2, y2, dx, dy)
		{
			return ((x1 <= x2+dx && x1 >= x2-dx) && (y1 <= y2+dy && y1 >= y2-dy));
		},

		is_in_area: function(x, y, dx, dy)
		{
			return this._is_in_area(this.pos.x, this.pos.y, x, y, dx, dy);
		},

		clicked: function()
		{
			this._clicked = true;
		},

		clicked_with_item: function(id)
		{

		},
	});
});