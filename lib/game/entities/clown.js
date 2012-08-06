ig.module
(
	'game.entities.clown'
)
.requires
(
	'game.entities.base',
	'game.scenes.scene4'
)
.defines(function()
{
	EntityClown = EntityBase.extend(
	{
		animSheet: new ig.AnimationSheet('media/entities/clown.png', 64, 64),
		
		size: { x: 64, y: 64 },
		offset: { x: 0, y: 0 },

		_dialog: null,

		talking: false,

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
						answers: null,
						x: 160,
						y: 20,
						settings:
						{
							text: 'Hahahahahaha.\nIhr seid zu spaet!',
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
						x: 160,
						y: 20,
						settings:
						{
							text: 'Die Erde ist zerstoert,\nihr habt alles verloren!',
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
						x: 210,
						y: 30,
						settings:
						{
							text: 'Warum hast du\ndas getan?',
							func_begin: function(e)
							{
								global.player.talk();
							},
							func_end: function(e)
							{								
								global.player.talk_end();
							},
							func_param: this,
						}
					},	
					{
						id: '1-4',
						answers: null,
						x: 160,
						y: 20,
						settings:
						{
							text: 'NEIN!\nJETZT KANN MICH NIEMAND\nMEHR AUFHALTEN!',
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
						answers: null,
						x: 160,
						y: 20,
						settings:
						{
							text: 'Ich werde alles Leben vernichten!\nAlles...',
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
						answers: null,
						x: 210,
						y: 30,
						settings:
						{
							text: 'STOP!\nEs ist vorbei!',
							func_begin: function(e)
							{
								global.player.talk();
							},
							func_end: function(e)
							{								
								global.player.talk_end();
							},
							func_param: this,
						}
					},						
					{
						id: '1-7',
						answers: null,
						x: 160,
						y: 20,
						settings:
						{
							text: 'N E I N ! ...',
							func_begin: function(e)
							{
								e.talk();
							},
							func_end: function(e)
							{								
								e.talk_end();
							},
							func_param: this,
						}
					},							
					{
						id: '1-8',
						answers: null,
						x: 160,
						y: 20,
						settings:
						{
							text: 'Nichts ist vorbei.\nDie Kanone kann\nnicht angehalten werden.',
							func_begin: function(e)
							{
								e.talk();
							},
							func_end: function(e)
							{								
								e.talk_end();
							},
							func_param: this,
						}
					},					
					{
						id: '1-9',
						answers: '1-1',
						x: 160,
						y: 20,
						settings:
						{
							text: 'Bis jetzt wurde jeder\nGegner von mir eliminiert.',
							func_begin: function(e)
							{
								e.talk();
							},
							func_end: function(e)
							{								
								e.talk_end();
							},
							func_param: this,
						}
					},
					{
						id: '1-10',
						answers: null,
						x: 210,
						y: 30,
						settings:
						{
							text: 'Das war ja auch leicht,\ndein Atem hat sie\nparalysiert!',
							func_begin: function(e)
							{
								global.player.talk();
							},
							func_end: function(e)
							{								
								global.player.talk_end();
							},
							func_param: this,
							next: '1-13',
						}
					},
					{
						id: '1-11',
						answers: null,
						x: 210,
						y: 30,
						settings:
						{
							text: 'Dein Geruch allein reicht aus\nund ich waer\' kollabiert!',
							func_begin: function(e)
							{
								global.player.talk();
							},
							func_end: function(e)
							{								
								global.player.talk_end();
							},
							func_param: this,
							next: '1-14',
						}
					},	
					{
						id: '1-12',
						answers: null,
						x: 210,
						y: 30,
						settings:
						{
							text: 'Das ich nicht lache - Du\nund welche Armee?',
							func_begin: function(e)
							{
								global.player.talk();
							},
							func_end: function(e)
							{								
								global.player.talk_end();
							},
							func_param: this,
							next: '1-14',
						}
					},				
					{
						id: '1-13',
						answers: null,
						x: 160,
						y: 20,
						settings:
						{
							text: 'N E I I I I I I I N . . . . . .',
							func_begin: function(e)
							{
								e.talk();
							},
							func_end: function(e)
							{
								e.kill();			
								e.talk_end();
								ig.system.setGame(Scene4);
							},
							func_param: this,
						}
					},			
					{
						id: '1-14',
						answers: null,
						x: 160,
						y: 20,
						settings:
						{
							text: 'DIE KANONE FEUERT.\nDU HAST VERLOREN!',
							func_begin: function(e)
							{
								e.talk();
							},
							func_end: function(e)
							{								
								e.talk_end();
								ig.system.setGame(Scene4);
							},
							func_param: this,
						}
					},
				],

				answers:
				[
					{
						id: '1-1',
						answer:
						[
							{
								text: 'Dein Geruch allein reicht aus und ich waer\' kollabiert!',
								next: '1-11'
							},
							{
								text: 'Das war ja auch leicht, dein Atem hat sie paralysiert!',
								next: '1-10',
							},
							{
								text: 'Das ich nicht lache - Du und welche Armee?',
								next: '1-12'
							},
							{
								text: 'Ne lass mal...',
								next: -1
							},
						]
					},
				]
			});

			this.addAnim('idle', .6, [0]);
			this.addAnim('talk', .2, [0, 1]);
			this.addAnim('walk', .2, [0]);

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

		clicked_with_item: function(id)
		{
			this.parent();

			if (global.inventory[id] == global.items.shovel)
			{
				ig.game.dialog_manager.add_sentence(global.player.pos.x-20, global.player.pos.y-10, { text: 'Es lohnt sich,\nalles mitzunehmen!', func_begin: function(p) { global.player.talk(); }, func_end: function(p){ global.player.talk_end(); }});
				ig.game.dialog_manager.add_sentence(global.player.pos.x-20, global.player.pos.y-10, { text: 'Stirb, Clown!', func_begin: function(p) { global.player.talk(); }, func_end: function(p){ global.player.talk_end(); }});
				ig.game.dialog_manager.add_sentence(global.clown.pos.x, global.clown.pos.y-10, { text: 'NEIIIIIIIIIIIIIIIIIIIIIIIIIIIN......', func_begin: function(p) { global.skull.talk(); }, func_end: function(p){ global.skull.talk_end(); }});
				this.kill();
				ig.game.dialog_manager.add_sentence(global.player.pos.x-30, global.player.pos.y-10, { text: 'Das wars erstmal.\nDer Mond ist sicher...\nUnd jetzt auf zum Schatz!', func_begin: function(p) { global.player.talk(); }, func_end: function(p){ global.player.talk_end(); ig.system.setGame(Scene4); }});
			}
			else
			{
				ig.game.dialog_manager.add_sentence(global.player.pos.x, global.player.pos.y-100, { text: 'Was soll das?', func_begin: function(p) { global.player.talk(); }, func_end: function(p){ global.player.talk_end(); }});
			}
		},
	});
});