ig.module
(
	'game.entities.earth'
)
.requires
(
	'impact.game'
)
.defines(function()
{
	EntityEarth = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/entities/earth.png', 70, 127),

		size: { x: 50, y: 50 },
		offset: { x: 0 , y: 41 },
		
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
						x: 95,
						y: 70,
						settings:
						{
							text: 'Das war mal die Erde...',
							func_begin: function(e)
							{
								global.buddy.talk();
							},
							func_end: function(e)
							{
								global.buddy.talk_end();
							},
							func_param: this,
						},
					},						
					{
						id: '1-2',
						answers: null,
						x: 150,
						y: 70,
						settings:
						{
							text: 'Er wird dafuer\nbezahlen!',
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
				],
			});

			this.addAnim('idle', 1, [ (global.state.earth_destroyed) ? 6 : 0 ]);
			this.addAnim('explode', .6, [0, 1, 2, 3, 4, 5, 6], true);

			this.currentAnim = this.anims.idle;
		},

		explode: function()
		{
			this.currentAnim = this.anims.explode.rewind();
			global.state.earth_destroyed = true;
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