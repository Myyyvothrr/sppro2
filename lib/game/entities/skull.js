ig.module
(
	'game.entities.skull'
)
.requires
(
	'game.entities.base'
)
.defines(function()
{
	EntitySkull = EntityBase.extend(
	{
		animSheet: new ig.AnimationSheet('media/entities/skull.png', 32, 32),

		size: { x: 57, y: 72 },
		offset: { x: -25, y: 0 },

		_dialog: null,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this._dialog  = new Dialog(
			{
				start: '1-1',
				
				sentence:
				[							
					{
						id: '1-1',
						answers: '1-1',
						x: 295,
						y: 80,
						settings:
						{
							text: 'WAS WILLST DU?',
							align: ig.Font.ALIGN.RIGHT,
							func_begin: function(e)
							{
								e.talk();
							},
							func_end: function(e)
							{
								e.talk_end();
							},
							func_param: this,
						},
					},						
					{
						id: '1-2',
						answers: '1-1',
						x: 295,
						y: 80,
						settings:
						{
							text: 'DU KAEMPFST WIE EINE KUH.\nWEG!',
							align: ig.Font.ALIGN.RIGHT,
							func_begin: function(e)
							{
								e.talk();
							},
							func_end: function(e)
							{
								e.talk_end();
							},
							func_param: this,
						},
					},						
					{
						id: '1-3',
						answers: '1-1',
						x: 295,
						y: 80,
						settings:
						{
							text: 'HAHAHA... HAHA.\nWEG!',
							align: ig.Font.ALIGN.RIGHT,
							func_begin: function(e)
							{
								e.talk();
							},
							func_end: function(e)
							{
								e.talk_end();
							},
							func_param: this,
						},
					},					
					{
						id: '1-4',
						answers: '1-2',
						x: 295,
						y: 80,
						settings:
						{
							text: 'WAG ES, ALTER MANN!\nWEG!',
							align: ig.Font.ALIGN.RIGHT,
							func_begin: function(e)
							{
								e.talk();
							},
							func_end: function(e)
							{
								e.talk_end();
							},
							func_param: this,
						},
					},				
					{
						id: '1-5',
						answers: '1-2',
						x: 295,
						y: 80,
						settings:
						{
							text: 'NEIN!',
							align: ig.Font.ALIGN.RIGHT,
							func_begin: function(e)
							{
								e.talk();
							},
							func_end: function(e)
							{
								e.talk_end();
							},
							func_param: this,
						},
					},			
					{
						id: '1-6',
						answers: '1-3',
						x: 295,
						y: 80,
						settings:
						{
							text: 'NIX!',
							align: ig.Font.ALIGN.RIGHT,
							func_begin: function(e)
							{
								e.talk();
							},
							func_end: function(e)
							{
								e.talk_end();
							},
							func_param: this,
						},
					},
					{
						id: '1-7',
						answers: null,
						x: 295,
						y: 80,
						settings:
						{
							text: 'ICH... ... Oh...\nWEG!',
							align: ig.Font.ALIGN.RIGHT,
							func_begin: function(e)
							{
								e.talk();
							},
							func_end: function(e)
							{
								e.talk_end();
							},
							func_param: this,
						},
					},
				],

				answers:
				[
					{
						id: '1-1',
						answer:
						[
							{
								text: 'Hey, ich bin ein maechtiger Pirat!',
								next: '1-2',
							},
							{
								text: 'Wir suchen hier unseren Schatz...',
								next: '1-3',
							},							
							{
								text: 'Ich glaube du tust nur so stark!',
								next: '1-4',
							},							
							{
								text: 'Ich komme wieder...',
								next: -1,
							}
						]
					},
					{
						id: '1-2',
						answer:
						[
							{
								text: 'Bitte?',
								next: '1-5',
							},
							{
								text: 'Bitte bitte?',
								next: '1-6',
							},
						]
					},
					{
						id: '1-3',
						answer:
						[
							{
								text: 'Ha! Wenigstens lebe ich noch, verfaulter Kopf.',
								next: '1-7',
							},
							{
								text: 'Na gut...',
								next: -1,
							},
						]
					},
				]
			});

			this.addAnim('idle', 1.3, [0, 2]);
			this.addAnim('talk', .2, [0, 1]);
			this.addAnim('walk', 1, [0]);
		},

		update: function()
		{
			this.parent();

			if (!this._dialog.finished)
			{
				this._dialog.update();

				if (this._dialog.finished)
				{
					global.player.dialog_end();
					this.idle();
				}
			}
		},

		draw: function()
		{
			this.parent();

			this._dialog.draw();
		},

		react: function()
		{
			this._dialog.reset();
			this._dialog.start();

			global.player.dialog_begin();
		},

		clicked_with_item: function(id)
		{
			this.parent();

			if (global.inventory[id] == global.items.bucket)
			{
				ig.game.dialog_manager.add_sentence(global.player.pos.x-20, global.player.pos.y-100, { text: 'Nimm das!', func_begin: function(p) { global.player.talk(); }, func_end: function(p){ global.player.talk_end(); }});
				ig.game.dialog_manager.add_sentence(global.skull.pos.x, global.skull.pos.y-10, { align: ig.Font.ALIGN.RIGHT, text: 'AHHHH.....!', func_begin: function(p) { global.skull.talk(); }, func_end: function(p){ global.skull.talk_end(); }});
				this.kill();
				ig.game.dialog_manager.add_sentence(global.player.pos.x-30, global.player.pos.y-100, { text: 'Ich hab ihn!\nWeiter zum Clown!', func_begin: function(p) { global.player.talk(); }, func_end: function(p){ global.player.talk_end(); global.state.skull_gone =true; }});
			}
			else
			{
				ig.game.dialog_manager.add_sentence(global.player.pos.x, global.player.pos.y-100, { text: 'Was soll das?', func_begin: function(p) { global.player.talk(); }, func_end: function(p){ global.player.talk_end(); }});
			}
		},
	});
});