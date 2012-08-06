ig.module
(
	'game.entities.cannon'
)
.requires
(
	'impact.game'
)
.defines(function()
{
	EntityCannon = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/entities/cannon.png', 137, 159),

		size: { x: 137, y: 149 },
		offset: { x: 0 , y: 0 },
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);this._dialog  = new Dialog(
			{
				start: '1-1',
				
				sentence:
				[							
					{
						id: '1-1',
						answers: null,
						x: 30,
						y: 60,
						settings:
						{
							text: 'Wow, das ist mal\neine Laserkanone...',
							func_begin: function(e)
							{
								global.player.talk();
							},
							func_end: function(e)
							{
								global.player.talk_end();
							},
							func_param: this,
						},
					},						
					{
						id: '1-2',
						answers: null,
						x: 160,
						y: 20,
						settings:
						{
							text: 'Jaaaaa...\nDaran arbeite ich seit Jahren.',
							func_begin: function(e)
							{
								global.clown.talk();
							},
							func_end: function(e)
							{
								global.clown.talk_end();
							},
							func_param: this,
						},
					},
				],
			});

			this.addAnim('idle', 1, [ 0 ]);
		},

		update: function()
		{
			this.parent();

			if (!this._dialog.finished)
			{
				this._dialog.update();

				if (this._dialog.finished)
					global.player.dialog_end();
			}

			if (global.player && !global.player.blocked && ig.input.pressed('click'))
			{
				if ((ig.input.mouse.x >= this.pos.x && ig.input.mouse.x <= this.pos.x + this.size.x)
					&& (ig.input.mouse.y >= this.pos.y && ig.input.mouse.y <= this.pos.y + this.size.y))
				{
					global.player.blocked = true;
					this._dialog.reset();
					this._dialog.start();

					global.player.dialog_begin();
				}
			}	
		},

		draw: function()
		{
			this.parent();

			this._dialog.draw();
		},
	});
});