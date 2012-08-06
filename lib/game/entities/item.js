ig.module
(
	'game.entities.item'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityItem = ig.Entity.extend(
	{
		icon: null,

		_clicked: false,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);
		},

		update: function()
		{
			this.parent();
			
			if (!global.player.blocked && ig.input.pressed('click'))
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
				if (global.player.is_in_area(this.pos.x+16, this.pos.y+16, 16, 16))
				{
					this.picked_up();
				}
			}		
		},

		clicked: function()
		{
			this._clicked = true;
		},

		picked_up: function()
		{
			global.add_to_inventory(this);
			global.player.blocked = false;			
			this.kill();
		},
	});
});