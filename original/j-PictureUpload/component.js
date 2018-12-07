COMPONENT('pictureupload', 'extension:false;singlefile:true', function(self, config) {

	var empty, img, canvas, content = null;

	self.readonly();
	self.nocompile && self.nocompile();

	self.configure = function(key, value, init) {

		if (init)
			return;

		var redraw = false;

		switch (key) {
			case 'width':
			case 'height':
			case 'background':
				setTimeout2(self.id + 'reinit', self.reinit, 50);
				break;
			case 'label':
			case 'icon':
				redraw = true;
				break;
		}

		redraw && setTimeout2(self.id + 'redraw', function() {
			self.redraw();
			self.refresh();
		}, 50);
	};

	self.reinit = function() {
		canvas = document.createElement('canvas');
		canvas.width = config.width;
		canvas.height = config.height;
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = config.background || '#FFFFFF';
		ctx.fillRect(0, 0, config.width, config.height);
		empty = canvas.toDataURL('image/png');
		canvas = null;
	};

	self.redraw = function() {
		var label = config.label || content;
		self.html((label ? '<div class="ui-pictureupload-label">{0}{1}:</div>'.format(config.icon ? '<i class="fa fa-{0}"></i>'.format(config.icon) : '', label) : '') + '<input type="file" accept="image/*" class="hidden" /><img src="{0}" class="img-responsive" alt="" />'.format(empty, config.width, config.height));
		img = self.find('img');
		img.on('click', function() {
			self.find('input').trigger('click');
		});
	};

	self.make = function() {

		content = self.html();
		self.aclass('ui-pictureupload');
		self.reinit();
		self.redraw();

		self.event('change', 'input', function(evt) {
			self.upload(evt.target.files);
		});

		self.event('dragenter dragover dragexit drop dragleave', function (e) {

			e.stopPropagation();
			e.preventDefault();

			switch (e.type) {
				case 'drop':
					break;
				case 'dragenter':
				case 'dragover':
					return;
				case 'dragexit':
				case 'dragleave':
				default:
					return;
			}

			self.upload(e.originalEvent.dataTransfer.files);
		});
	};

	self.upload = function(files) {

		if (!files.length)
			return;

		var el = this;
		var data = new FormData();

		var filename = files[0].name;
		var index = filename.lastIndexOf('\\');
		if (index !== -1)
			filename = filename.substring(index + 1);

		data.append('file', files[0], filename);
		data.append('width', config.width);
		data.append('height', config.height);

		UPLOAD(config.url || location.pathname, data, function(response, err) {

			SETTER('loading', 'hide', 100);

			if (err) {
				SETTER('message', 'warning', err.toString());
				return;
			}

			self.change();
			el.value = '';


			if (config.extension) {
				for (var i = 0, length = response.length; i < length; i++) {
					var filename = response[i];
					var index = filename.lastIndexOf('.');
					if (index !== -1)
						response[i] = filename.substring(0, index);
				}
			}

			self.set(config.singlefile ? response[0] : response);
		});
	};

	self.setter = function(value) {
		if (value)
			img.attr('src', (config.src || '{0}').format(value));
		else
			img.attr('src', empty);
	};
});