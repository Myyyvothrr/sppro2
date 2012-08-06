ig.module
(
	'game.entities.buddy'
)
.requires
(
	'game.entities.base'
)
.defines(function()
{
	EntityBuddy = EntityBase.extend(
	{
		animSheet: new ig.AnimationSheet('media/entities/buddy.png', 32, 64),
		
		size: { x: 42, y: 64 },
		offset: { x: -10, y: 0 },

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
						x: 95,
						y: 70,
						settings:
						{
							text: 'Captain, was gibts?',
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
						answers: null,
						x: 95,
						y: 70,
						settings:
						{
							text: 'Hey, schon eine Idee?',
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
						answers: null,
						x: 150,
						y: 70,
						settings:
						{
							text: 'Mir fehlt unsere Ausruestung...',
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
						id: '1-4',
						answers: null,
						x: 95,
						y: 70,
						settings:
						{
							text: 'Ha, ja dann gaebs\nvolles Pfund aufs Maul.',
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
						x: 150,
						y: 70,
						settings:
						{
							text: 'Genau! Hmm, vielleicht\nkoennen wir ihn ueberlisten...',
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
						id: '1-6',
						answers: '1-2',
						x: 95,
						y: 70,
						settings:
						{
							text: 'Ne lass mal, dazu\nsind wir zu alt.',
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
						x: 95,
						y: 70,
						settings:
						{
							text: 'Yo.\nWas hast du vor?',
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
						id: '1-8',
						answers: null,
						x: 150,
						y: 70,
						settings:
						{
							text: 'Hast du den Eimer da\ngesehen?',
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
						id: '1-9',
						answers: null,
						x: 95,
						y: 70,
						settings:
						{
							text: 'Ah, eine gute Idee!',
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
						id: '1-10',
						answers: null,
						x: 150,
						y: 70,
						settings:
						{
							text: 'Was? Du weisst was?',
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
						id: '1-11',
						answers: null,
						x: 95,
						y: 70,
						settings:
						{
							text: 'Klar, in einem Eimer\nfindest du immer was.',
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
						id: '1-12',
						answers: null,
						x: 150,
						y: 70,
						settings:
						{
							text: 'Na da bin ich ja mal gespannt...',
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

				answers:
				[
					{
						id: '1-1',
						answer:
						[
							{
								text: 'Dieser verdammte Totenkopf...',
								next: '1-2',
							},
							{
								text: 'Ne, will dich nicht beim denken stoeren...',
								next: -1,
							}
						]
					},
					{
						id: '1-2',
						answer:
						[
							{
								text: 'Wir koennten ihn zusammen angreifen!',
								next: '1-6',
							},
							{
								text: 'Ich glaube, der Kopf tut nur so stark.',
								next: '1-7',
							},
							{
								text: 'Ich versuchs weiter.',
								next: -1,
							}
						]
					}
				]
			});

			this.addAnim('idle', 2, [0, 1]);
			this.addAnim('talk', .3, [0, 2]);
			this.addAnim('walk', 1, [0]);

			this.idle();
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
	});
});