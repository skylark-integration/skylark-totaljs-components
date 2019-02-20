COMPONENT('textboxtags', function(self, config) {

	var isString = false;
	var container, content = null;
	var refresh = false;
	var W = window;

	if (!W.$textboxtagstemplate)
		W.$textboxtagstemplate = Tangular.compile('<div class="ui-textboxtags-tag" data-name="{{ name }}">{{ name }}<i class="fa fa-times"></i></div>');

	var template = W.$textboxtagstemplate;

	self.nocompile && self.nocompile();

	self.validate = function(value) {
		return config.disabled || !config.required ? true : value && value.length > 0;
	};

	self.configure = function(key, value, init) {
		if (init)
			return;

		var redraw = false;

		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', value);
				self.find('input').prop('disabled', value);
				self.reset();
				break;
			case 'required':
				self.tclass('ui-textboxtags-required', value);
				self.state(1, 1);
				break;
			case 'icon':
				var fa = self.find('.ui-textboxtags-label > i');
				if (fa.length && value)
					fa.rclass().aclass('fa fa-' + value);
				else
					redraw = true;
				break;

			case 'placeholder':
				self.find('input').prop('placeholder', value);
				break;
			case 'height':
				self.find('.ui-textboxtags-values').css('height', value);
				break;
			case 'label':
				redraw = true;
				break;
			case 'type':
				self.type = value;
				isString = self.type === 'string';
				break;
		}

		redraw && setTimeout2('redraw' + self.id, function() {
			refresh = true;
			container.off();
			self.redraw();
			self.refresh();
		}, 100);

	};

	self.redraw = function() {
		var label = config.label || content;
		var html = '<div class="ui-textboxtags-values"' + (config.height ? ' style="min-height:' + config.height + 'px"' : '') + '><input type="text" placeholder="' + (config.placeholder || '') + '" /></div>';

		isString = self.type === 'string';

		if (content.length) {
			self.html('<div class="ui-textboxtags-label">{0}{1}:</div><div class="ui-textboxtags">{2}</div>'.format((config.icon ? '<i class="fa fa-' + config.icon + '"></i> ' : ''), label, html));
		} else {
			self.aclass('ui-textboxtags');
			self.html(html);
		}

		container = self.find('.ui-textboxtags-values');
		config.disabled && self.reconfigure('disabled:true');
	};

	self.make = function() {

		self.aclass('ui-textboxtags-container');
		config.required && self.aclass('ui-textboxtags-required');
		content = self.html();
		self.type = config.type || '';
		self.redraw();

		self.event('click', '.fa-times', function(e) {

			if (config.disabled)
				return;

			e.preventDefault();
			e.stopPropagation();

			var el = $(this);
			var arr = self.get();

			if (isString)
				arr = self.split(arr);

			if (!arr || !(arr instanceof Array) || !arr.length)
				return;

			var index = arr.indexOf(el.parent().attr('data-name'));
			if (index === -1)
				return;

			arr.splice(index, 1);
			self.set(isString ? arr.join(', ') : arr);
			self.change(true);
		});

		self.event('click', function() {
			!config.disabled && self.find('input').focus();
		});

		self.event('focus', 'input', function() {
			config.focus && EXEC(config.focus, $(this), self);
		});

		self.event('keydown', 'input', function(e) {

			if (config.disabled)
				return;

			if (e.which === 8) {
				if (this.value)
					return;
				var arr = self.get();
				if (isString)
					arr = self.split(arr);
				if (!arr || !(arr instanceof Array) || !arr.length)
					return;
				arr.pop();
				self.set(isString ? arr.join(', ') : arr);
				self.change(true);
				return;
			}

			if (e.which !== 13)
				return;

			e.preventDefault();

			if (!this.value)
				return;

			var arr = self.get();
			var value = this.value;

			if (config.uppercase)
				value = value.toUpperCase();
			else if (config.lowercase)
				value = value.toLowerCase();

			if (isString)
				arr = self.split(arr);

			if (!(arr instanceof Array))
				arr = [];

			if (arr.indexOf(value) === -1)
				arr.push(value);
			else
				return;

			this.value = '';
			self.set(isString ? arr.join(', ') : arr);
			self.change(true);
		});
	};

	self.split = function(value) {
		if (!value)
			return [];
		var arr = value.split(',');
		for (var i = 0, length = arr.length; i < length; i++)
			arr[i] = arr[i].trim();
		return arr;
	};

	self.setter = function(value) {

		if (!refresh && NOTMODIFIED(self.id, value))
			return;

		refresh = false;
		container.find('.ui-textboxtags-tag').remove();

		if (!value || !value.length)
			return;

		var arr = isString ? self.split(value) : value;
		var builder = '';
		for (var i = 0, length = arr.length; i < length; i++)
			builder += template({ name: arr[i] });

		container.prepend(builder);
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.tclass('ui-textboxtags-invalid', invalid);
	};
});
