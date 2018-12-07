COMPONENT('touchmove', 'diff:110', function(self, config) {

	var begX, begY;

	self.readonly();
	self.make = function() {
		self.event('touchstart touchmove', function(e) {

			var x = e.originalEvent.touches[0].pageX;
			var y = e.originalEvent.touches[0].pageY;

			if (e.type === 'touchstart') {
				begX = x;
				begY = y;
				return;
			}

			var diffX = begX - x;
			var diffY = begY - y;
			var path;

			if (diffX > config.diff) {
				// prev
				path = config.next;
			} else if (diffX < -config.diff) {
				// prev
				path = config.prev;
			} else if (diffY > config.diff) {
				// down
				path = config.down;
			} else if (diffY < -config.diff) {
				// up
				path = config.up;
			}

			if (path) {
				self.get(path)();
				e.preventDefault();
				e.stopPropagation();
			}
		});
	};
});