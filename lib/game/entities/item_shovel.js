ig.module
(
	'game.entities.item_shovel'
)
.requires
(
	'game.entities.item'
)
.defines(function()
{
	EntityItemShovel = EntityItem.extend(
	{
		animSheet: new ig.AnimationSheet('media/items/shovel.png', 32, 32),

		icon: new ig.Image('media/items/shovel-icon.png'),

		size: { x: 42, y: 32 },
		offset: { x: -5, y: 0 },

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
		},

		clicked: function()
		{
			this.parent();

			ig.game.dialog_manager.add_sentence(global.player.pos.x, global.player.pos.y-100, { text: 'Wo hatten wir den\nSchatz nochmal\nvergraben?', func_begin: function(p) { global.player.talk(); }, func_end: function(p){ global.player.talk_end(); }});
		},

		picked_up: function()
		{
			this.parent();
			
			ig.game.dialog_manager.add_sentence(global.player.pos.x, global.player.pos.y-100, { text: 'Ich liebe dich, Schaufel!', func_begin: function(p) { global.player.talk(); }, func_end: function(p){ global.player.talk_end(); }});
		},
	});
});