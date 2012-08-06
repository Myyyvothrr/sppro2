ig.module
(
	'game.entities.item_bucket'
)
.requires
(
	'game.entities.item'
)
.defines(function()
{
	EntityItemBucket = EntityItem.extend(
	{
		animSheet: new ig.AnimationSheet('media/items/bucket.png', 32, 32),

		icon: new ig.Image('media/items/bucket_icon.png'),

		size: { x: 32, y: 32 },

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
		},

		clicked: function()
		{
			this.parent();

			ig.game.dialog_manager.add_sentence(global.player.pos.x, global.player.pos.y-100, { text: 'Hm ein Eimer,\nob da was drin ist?', func_begin: function(p) { global.player.talk(); }, func_end: function(p){ global.player.talk_end(); }});
		},

		picked_up: function()
		{
			this.parent();
			
			ig.game.dialog_manager.add_sentence(global.player.pos.x, global.player.pos.y-100, { text: 'Ne, is leer. Egal, ich bin\nsicher den kann ich gebrauchen.', func_begin: function(p) { global.player.talk(); }, func_end: function(p){ global.player.talk_end(); }});
		},
	});
});