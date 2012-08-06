ig.module
( 
	'game.task_queue' 
)
.requires
(
)
.defines(function()
{
	TaskQueue = ig.Class.extend(
	{
		_queue: [],
		_current: null,
		empty: false,
		started: false,
		finished: false,

		update: function()
		{
			if (this.empty)
				this.ended();

			if (!this.started)
				return null;

			if (this._current && !this._current.finished)
				return this._current.update();
			else
				this.next();

			return null;		
		},

		draw: function()
		{
			if (this._current)
				this._current.draw();
		},

		reset: function()
		{
			this._current = null;
			this.empty = false;
			this.started = false;
			this.finished = false;
		},

		add_task: function(task)
		{
			this._queue.push(task);
		},

		next: function()
		{			
			this._current = null;
			this._current = this._queue.shift();

			if (this._current)
				this._current.start();
			else
				this.empty = true;
		},

		ended: function()
		{
			this.finished = true;
		},

		start: function()
		{
			this.started = true;
			this.next();
		},
	});
});