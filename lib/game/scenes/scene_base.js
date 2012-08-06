ig.module
( 
	'game.scenes.scene_base' 
)
.requires
(
	'impact.game',

	'game.entities.player',
	'game.entities.skull',
	'game.dialog'
)
.defines(function()
{
	BaseScene = ig.Game.extend(
	{
		clearColor: null,
		autoSort: true,
		sortBy: ig.Game.SORT.POS_Y,

		dialog_manager: new Dialog(),

		collision_bounds:
		{
			left: 0,
			right: 320,
			top: 0,
			bottom: 200,
		},

		init: function(x, y)
		{
			global.player = this.spawnEntity(EntityPlayer, x, y);

			// Läuft immer im Hintergrund
			this.dialog_manager.start();
		},

		update: function()
		{
			this.parent();

			this.dialog_manager.update();
		},

		draw: function()
		{
			this.parent();

			this.dialog_manager.draw();
		},

		is_mouse_in_bounds: function()
		{
			return ((ig.input.mouse.x >= this.collision_bounds.left && ig.input.mouse.x <= this.collision_bounds.right)
				&& (ig.input.mouse.y >= this.collision_bounds.top && ig.input.mouse.y <= this.collision_bounds.bottom));
		},
	});
});
