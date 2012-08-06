ig.module
( 
	'game.scenes.scene1' 
)
.requires
(
	'game.scenes.scene_base',

	'game.entities.item_bucket',
	'game.entities.item_shovel',
	'game.entities.buddy',
	'game.entities.earth',

	'game.scenes.scene3'
)
.defines(function()
{
	Scene1 = BaseScene.extend(
	{
		_bg: new ig.Image('media/backgrounds/station1.png'),

		_cutscene: null,

		collision_bounds:
		{
			left: 0,
			right: 300,
			top: 153,
			bottom: 200,
		},

		init: function()
		{
			this.parent(-32, 160);

			if (!global.bucket_pickedup)
				global.items.bucket = this.spawnEntity(EntityItemBucket, 2, 131);

			global.items.shovel = this.spawnEntity(EntityItemShovel, 162, 165);

			global.buddy = this.spawnEntity(EntityBuddy, 87, 89);

			global.skull = this.spawnEntity(EntitySkull, 320, 145);

			global.earth = this.spawnEntity(EntityEarth, 201, 53);

			this._cutscene = new Cutscene(
			{
				start: '1-1',
				
				sentence:
				[
					{
						id: '1-1',
						answers: null,
						x: 0,
						y: 0,
						settings:
						{
							text: '',
							duration: 3,
							func_begin: function(game)
							{
								global.player.add_waypoint(150, 170);
							},
							func_end: function(game)
							{

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
							text: 'Schnell, er ist dort den Gang lang.\nGleich haben wir ihn.',
							func_begin: function(game)
							{
								global.buddy.talk();
							},
							func_end: function(game)
							{
								global.buddy.talk_end();
								global.player.add_waypoint(250, 190);
							},
							func_param: this,
						},
					},
					{
						id: '1-3',
						answers: null,
						x: 0,
						y: 0,
						settings:
						{
							text: '',
							duration: 3,
							align: ig.Font.ALIGN.RIGHT,
							func_begin: function(game)
							{
								global.skull.move_to(285, 180);
							},
							func_end: function(game)
							{
							},
							func_param: this,
						},
					},
					{
						id: '1-4',
						answers: null,
						x: 295,
						y: 80,
						settings:
						{
							text: 'STOP!\nAN MIR KOMMT\nNIEMAND VORBEI!',
							align: ig.Font.ALIGN.RIGHT,
							func_begin: function(game)
							{
								global.skull.talk();
							},
							func_end: function(game)
							{
								global.skull.talk_end();
								global.skull.move_to(350, 160);
								global.player.add_waypoint(145, 159);
							},
							func_param: this,
						},
					},
					{
						id: '1-5',
						answers: null,
						x: 0,
						y: 0,
						settings:
						{
							text: '',
							duration: 4,
						},
					},
					{
						id: '1-6',
						answers: null,
						x: 150,
						y: 70,
						settings:
						{
							text: 'Frueher haette uns das\nnicht aufgehalten...',
							func_begin: function(game)
							{
								global.player.talk();
							},
							func_end: function(game)
							{								
								global.player.talk_end();
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
							text: 'Hey Captain,\ner schiesst!',
							func_begin: function(game)
							{
								global.buddy.talk();
							},
							func_end: function(game)
							{
								global.buddy.talk_end();
								global.player.move_to(160, 159);
							},
							func_param: this,
						},
					},
					{
						id: '1-8',
						answers: null,
						x: 0,
						y: 0,
						settings:
						{
							text: '',
							duration: 7,
							func_begin: function(game)
							{
								global.earth.explode();
							},
							func_end: function(game)
							{								
								global.player.move_to(150, 156);
							},
							func_param: this,
						},
					},
					{
						id: '1-9',
						answers: null,
						x: 150,
						y: 70,
						settings:
						{
							text: 'Verdammt, er hat die\nErde zerbroeselt!\n',
							func_begin: function(game)
							{
								global.player.talk();
							},
							func_end: function(game)
							{				
								global.player.talk_end();				
							},
							func_param: this,
						},
					},
					{
						id: '1-9-2',
						answers: null,
						x: 95,
						y: 70,
						settings:
						{
							text: 'Wir muessen verhindern dass er\nauch noch den Mond zerstoert.',
							func_begin: function(game)
							{
								global.buddy.talk();
							},
							func_end: function(game)
							{								
								global.buddy.talk_end();
							},
							func_param: this,
						},
					},
					{
						id: '1-9-3',
						answers: null,
						x: 150,
						y: 70,
						settings:
						{
							text: 'Unbedingt, denk dran dass unser\nSchatz hier immer noch liegt!',
							func_begin: function(game)
							{
								global.player.talk();
							},
							func_end: function(game)
							{						
								global.player.talk_end();		
							},
							func_param: this,
						},
					},
					{
						id: '1-9-4',
						answers: null,
						x: 95,
						y: 70,
						settings:
						{
							text: 'Yo, ich sagte ja die\nErde ist kein sicheres Versteck...',
							func_begin: function(game)
							{
								global.buddy.talk();
							},
							func_end: function(game)
							{								
								global.buddy.talk_end();
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
							text: 'Lass uns den Wahnsinnigen\nschnell ausschalten.',
							func_begin: function(game)
							{
								global.player.talk();
							},
							func_end: function(game)
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
							text: 'Wie frueher...',
							func_begin: function(game)
							{
								global.buddy.talk();
							},
							func_end: function(game)
							{
								global.buddy.talk_end();
								global.player.move_to(240, 180);
								global.skull.move_to(285, 180);
							},
							func_param: this,
						},
					},
				],
			});

			this._cutscene.start();
		},

		update: function()
		{
			this.parent();

			if (this._cutscene)
			{
				this._cutscene.update();
				if (this._cutscene.finished)
					this._cutscene = null;
			}

			if (global.state.skull_gone)
				ig.system.setGame(Scene3);
		},

		draw: function()
		{
			this._bg.draw(0, 0);

			this.parent();

			if (this._cutscene)
				this._cutscene.draw();
		}
	});
});
