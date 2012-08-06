ig.module
( 
	'game.scenes.scene4' 
)
.requires
(
	'game.scenes.scene_base',
	'game.cutscene'
)
.defines(function()
{
	Scene4 = BaseScene.extend(
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
						y: 35,
						settings:
						{
							text: 'Danke fuers Spielen!\n\nSpiel von\nDaniel Baumartz\n\nwww.myyyvothrr.de',
							delay: .15,
							duration: 120,
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
		},

		draw: function()
		{
			this._bg.draw(0, 0);

			this.parent();

			this._cutscene.draw();
		}
	});
});
