ig.module
( 
	'game.scenes.scene0' 
)
.requires
(
	'game.scenes.scene_base',
	'game.cutscene',
	'game.scenes.scene1'
)
.defines(function()
{
	Scene0 = BaseScene.extend(
	{
		_cutscene: null,

		_bg: new ig.Image('media/backgrounds/intro.png'),

		init: function()
		{
			// Kein Parent => kein Player
			// Nur Intro abspielen
			this._cutscene = new Cutscene(
			{
				start: '1-1',
				
				sentence:
				[
					{
						id: '1-1',
						answers: null,
						x: 160,
						y: 55,
						settings:
						{
							text: '5. April 2063\n\nDie dunkle Seite des Monds',
							delay: .15,
							duration: 10,
							align: ig.Font.ALIGN.CENTER,
						},
					},
				],
			});

			this._cutscene.start();
		},

		update: function()
		{
			this.parent();

			this._cutscene.update();

			if (this._cutscene.finished)
				ig.system.setGame(Scene1);
		},

		draw: function()
		{
			this._bg.draw(0, 0);

			this.parent();

			this._cutscene.draw();
		}
	});
});
