ig.module
( 
	'game.main' 
)
.requires
(
	'impact.game',
//	'impact.debug.debug',

	'game.global',
		
	'game.scenes.scene0'
)
.defines(function()
{
	MyGame = ig.Game.extend(
	{
		clearColor: null,

		init: function()
		{
			ig.input.bind(ig.KEY.MOUSE1, 'click');
		},

		update: function()
		{
			this.parent();

			ig.system.setGame(Scene0);
		}
	});

	ig.main('#canvas', MyGame, 60, 320, 200, 3);
});
