ig.module
( 
	'game.scenes.scene2' 
)
.requires
(
	'game.scenes.scene_base',
	'game.cutscene',
	'game.scenes.scene3'
)
.defines(function()
{
	Scene2 = BaseScene.extend(
	{
		_cutscene: null,

		_bg: new ig.Image('media/backgrounds/station2.png'),

		init: function()
		{
			this.parent(32, 200);
		},

		update: function()
		{
			this.parent();

			if (ig.game.player.pos.y < 100)
				ig.system.setGame(Scene3);
			else  if (ig.game.player.pos.x < 10)
				ig.system.setGame(Scene1);
		},

		draw: function()
		{
			this._bg.draw(0, 0);

			this.parent();
		}
	});
});
