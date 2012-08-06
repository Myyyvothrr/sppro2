ig.module
( 
	'game.scenes.scene3' 
)
.requires
(
	'game.scenes.scene_base',
	'game.cutscene',
	'game.entities.clown',
	'game.entities.cannon'
)
.defines(function()
{
	Scene3 = BaseScene.extend(
	{
		_cutscene: null,

		collision_bounds:
		{
			left: 167,
			right: 320,
			top: 40,
			bottom: 190,
		},

		_bg: new ig.Image('media/backgrounds/station3.png'),
		_front: new ig.Image('media/backgrounds/station3-front.png'),

		init: function()
		{
			this.parent(320, 170);

			global.clown = this.spawnEntity(EntityClown, 155, 45);

			global.cannon = this.spawnEntity(EntityCannon, 1, 9);

			global.player.move_to(220, 120);
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
		},

		draw: function()
		{
			this._bg.draw(0, 0);

			this.parent();

			this._front.draw(0, 0);

			if (this._cutscene)
				this._cutscene.draw();
		}
	});
});
