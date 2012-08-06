ig.module
( 
	'game.task' 
)
.requires
(
)
.defines(function()
{
	Task = ig.Class.extend(
	{
		finished: false,

		_func_begin: null,
		_func_end: null,
		_func_param: null,

		_duration_timer: new ig.Timer(0),
		_duration: 8,

		init: function(settings)
		{
			if (settings.duration)
				this._duration = settings.duration;

			if (settings.func_begin)
				this._func_begin = settings.func_begin;

			if (settings.func_end)
				this._func_end = settings.func_end;

			if (settings.func_param)
				this._func_param = settings.func_param;
		},

		update: function()
		{
			if (this._duration_timer.delta() >= 0)
			{
				this.finished = true;
				
				if (this._func_end)
					this._func_end(this._func_param);
			}
		},

		draw: function()
		{
		},

		start: function()
		{
			this._duration_timer.set(this._duration);

			this.finished = false;

			if (this._func_begin)
				this._func_begin(this._func_param);
		},
	});
});