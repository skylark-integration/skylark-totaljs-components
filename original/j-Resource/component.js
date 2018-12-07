COMPONENT('resource', function(self) {

	self.readonly();
	self.blind();
	self.nocompile && self.nocompile();

	self.init = function() {
		window.RESOURCEDB = {};
		window.RESOURCE = function(name, def) {
			return RESOURCEDB[name] || def || name;
		};
	};

	self.download = function(url, callback) {
		AJAX('GET ' + url, function(response) {
			if (!response) {
				callback && callback();
				return;
			}

			if (typeof(response) !== 'string')
				response = response.toString();
			self.prepare(response);
			callback && callback();
		});
	};

	self.prepare = function(value) {
		var w = window;
		value.split('\n').forEach(function(line) {

			var clean = line.trim();
			if (clean.substring(0, 2) === '//')
				return;

			var index = clean.indexOf(':');
			if (index === -1)
				return;

			var key = clean.substring(0, index).trim();
			var value = clean.substring(index + 1).trim();

			w.RESOURCEDB[key] = value;
		});
		return self;
	};

	self.make = function() {
		var el = self.find('script');
		self.prepare(el.html());
		el.remove();
	};
});