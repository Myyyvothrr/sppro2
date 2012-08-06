ig.module
(
	'game.entities.player'
)
.requires
(
	'game.entities.base'
)
.defines(function()
{
	EntityPlayer = EntityBase.extend(
	{
		animSheet: new ig.AnimationSheet('media/entities/pirate.png', 32, 64),
		
		size: { x: 32, y: 16 },
		offset: { x: 0, y: 48 },

		_inventory_open: false,
		_inventory_bg: new ig.Image('media/items/inventory-bg.png'),

		item_selected: -1,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', .6, [0, 1]);
			this.addAnim('talk', .2, [0, 2]);
			this.addAnim('walk', .2, [3, 4, 5, 6, 7, 8]);

			this.idle();
		},

		update: function()
		{
			if (!this.blocked)
			{
				if (ig.input.mouse.y >= 195)
					this.open_inventory();
				else if (ig.input.mouse.y <= 175)
					this.close_inventory();

				if (this.item_selected >= 0)
				{
					if (ig.input.pressed('click') && ig.input.mouse.y > 170)
						this.item_selected = -1;
				}
				else
				{				
					if (this._inventory_open && ig.input.pressed('click'))
					{
						for (var i = 0; i < global.inventory.length; ++i)
						{
							if ((ig.input.mouse.x >= 5+32*i && ig.input.mouse.x <= 5+32*i + 20)
								&& (ig.input.mouse.y >= 176+2 && ig.input.mouse.y <= 176+2 + 20))
							{
								this.item_selected = i;
								break;
							}
						}
					}
				}

				if (this.can_move && ig.input.mouse.y < (this._inventory_open ? 170 : 195) && ig.input.pressed('click') && ig.game.is_mouse_in_bounds())
					this.move_to(ig.input.mouse.x, ig.input.mouse.y);
			}

			this.parent();
		},

		draw: function()
		{
			this.parent();

			if (!this.blocked)
			{
				var ypos = this._inventory_open ? 176 : 198;
				
				this._inventory_bg.draw(0, ypos);

				for (var i = 0; i < global.inventory.length; ++i)
				{
					if (global.inventory[i].icon)
					{
						global.inventory[i].icon.draw(5+32*i, ypos+2);
					}
				}
			}			

			if (this.item_selected >= 0)
			{
				global.inventory[this.item_selected].icon.draw(ig.input.mouse.x-10, ig.input.mouse.y-10);
			}
		},

		open_inventory: function()
		{
			this._inventory_open = true;
		},

		close_inventory: function()
		{
			this._inventory_open = false;
		},
	});
});