ig.module
( 
	'game.cutscene' 
)
.requires
(
	'game.dialog'
)
.defines(function()
{
	Cutscene = Dialog.extend(
	{
		ended: function()
		{
			this.parent();
			
			if (global.player)
				global.player.cutscene_end();
		},

		start: function()
		{
			this.parent();

			if (global.player)
				global.player.cutscene_begin();
		},
	});
});