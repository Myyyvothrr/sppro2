ig.module
( 
	'game.dialog' 
)
.requires
(
	'game.task_queue',
	'game.dialog_sentence'
)
.defines(function()
{
	Dialog = TaskQueue.extend(
	{
		_tree: null,
		_next_id: null,
		_last: 0,

		init: function(tree)
		{
			if (tree)
			{
				this._tree = tree;
				this._next_id = this._tree.start;
			}
		},

		update: function()
		{
			if (!this.started)
				return null;

			this._next_id = this.parent();
		},

		reset: function()
		{
			this.parent();
			
			this._last = 0;
			this._next_id = this._tree.start;
		},

		next: function()
		{
			this._current = null;

			if (this._next_id == -1)
			{
				this.empty = true;
				return;
			}

			if (this._tree)
			{
				if (!this._next_id)
				{
					if (this._tree.sentence[this._last].settings.next)
					{
						this._next_id = this._tree.sentence[this._last].settings.next;
						ig.log("YAY");
					}
					else if (this._tree.sentence[this._last+1])
						this._next_id = this._tree.sentence[this._last+1].id;
				}

				if (this._next_id)
				{
					for (var i = 0; i < this._tree.sentence.length; ++i)
					{						
						if (this._tree.sentence[i].id == this._next_id)
						{
							this._next_id = null;
							this._last = i;
							var answers = null;

							if (this._tree.sentence[i].answers)
							{
								stop = true;
								answers = new Array();

								for (var j = 0; j < this._tree.answers.length; ++j)
								{
									if (this._tree.sentence[i].answers == this._tree.answers[j].id)
									{
										for (var k = 0; k < this._tree.answers[j].answer.length; ++k)
										{
											answers.push({ text: this._tree.answers[j].answer[k].text, next: this._tree.answers[j].answer[k].next });
										}

										break;
									}
								}
							}

							this._tree.sentence[i].settings.answers = answers;

							this.add_sentence(this._tree.sentence[i].x, this._tree.sentence[i].y, this._tree.sentence[i].settings);
							
							break;
						}
					}
				}
			}

			this._current = this._queue.shift();

			if (this._current)
				this._current.start();
			else
				this.empty = true;
		},

		next_clicked: function()
		{
			if (this._current)
				this._current.next_clicked();
		},

		add_sentence: function(x, y, settings)
		{
			this.add_task(new Sentence(x, y, settings));
		},

		add_sentence_pause: function(duration)
		{
			this.add_task(new Sentence(0, 0, { duration: duration }));
		},
	});
});