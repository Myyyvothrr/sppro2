ig.module
( 
	'game.dialog_answers' 
)
.requires
(
)
.defines(function()
{
	Answers = ig.Class.extend(
	{
		_font: new ig.Font('media/fonts/04b03.font.png'),

		_answers: [],

		init: function(answers)
		{
			this._answers = answers;
		},

		update: function()
		{
			if (ig.input.pressed('click'))
			{
				for (var i = 0; i < this._answers.length; ++i)
				{
					if (ig.input.mouse.x >= 5 && ig.input.mouse.x <= this._font.widthForString(this._answers[i].text)
						&& ig.input.mouse.y >= (160 + 10*i) && ig.input.mouse.y <= (160 + 10*i + this._font.heightForString(this._answers[i].text)))
					{
						return this._answers[i].next;
					}
				}
			}

			return null;
		},

		draw: function()
		{
			for (var i = 0; i < this._answers.length; ++i)
				this._font.draw(this._answers[i].text, 5, 160 + 10*i);
		},
	});
});