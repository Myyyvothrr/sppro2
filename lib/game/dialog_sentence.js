ig.module
( 
	'game.dialog_sentence' 
)
.requires
(
	'game.task',
	'game.dialog_answers' 
)
.defines(function()
{
	Sentence = Task.extend(
	{
		_font: new ig.Font('media/fonts/04b03.font.png'),

		_text: "",
		_text_all: "",

		_align: ig.Font.ALIGN.LEFT,

		_display: false,
		_waiting: false,

		_delay_timer: new ig.Timer(0),
		_delay: .1,

		_x: 0,
		_y: 0,

		_answers: null,
		_display_answers: false,
		
		init: function(x, y, settings)
		{
			this.parent(settings);

			this._x = x;
			this._y = y;

			if (settings.text)
				this._text_all = settings.text;

			if (settings.delay)
				this._delay = settings.delay;			

			if (settings.align)
				this._align = settings.align;

			if (settings.answers)				
				this._answers = new Answers(settings.answers);
		},

		update: function()
		{
			var ret = null;

			if (this._display_answers)
			{
				ret = this._answers.update();				
				this.finished = (ret != null) || (ret == -1);
			}

			if (!this._display || this.finished)
				return ret;

			if (!this._waiting)
			{
				if (this._delay_timer.delta() >= 0)
					this._delay_timer.set(this._delay);
				else
					return ret;

				if (this._text.length >= this._text_all.length)
				{
					if (this._answers)
						this._display_answers = true;
					else
						this._waiting = true;
				}

				if (this._text.length < this._text_all.length)
					this._text += this._text_all[this._text.length];
			}
			else
			{
				this.parent();
			}

			return ret;
		},

		next_clicked: function()
		{
			if (!this._display)
				return;
			
			if (this._text.length < this._text_all.length)
				this._text = this._text_all;
			else if (!this._answers)
				this.finished = true;
		},

		draw: function()
		{
			if (this._display)
				this._font.draw(this._text, this._x, this._y, this._align);

			if (this._display_answers)
				this._answers.draw();
		},

		start: function()
		{
			this.parent();

			this._display = true;
		}
	});
});