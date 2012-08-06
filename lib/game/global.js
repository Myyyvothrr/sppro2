ig.module
( 
	'game.global' 
)
.requires
(
)
.defines(function()
{
	window.global =
	{
		player: null,

		inventory: [],

		add_to_inventory: function(item)
		{
			global.inventory.push(item);
		},

		buddy: null,
		clown: null,
		skull: null,
		cannon: null,

		earth: null,

		items:
		{
			bucket: null,
			shovel: null,
		},

		state:
		{
			earth_destroyed: false,

			skull_gone: false,

			bucket_pickedup: false,
		},
	};
});