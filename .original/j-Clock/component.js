COMPONENT('clock', 'twelvehour:false', function(self, config) {

	var visible = false;
	var dialRadius = 100, outerRadius = 80,	innerRadius = 54, tickRadius = 13;

	self.readonly();
	self.nocompile && self.nocompile();
	self.click = NOOP;

	self.hide = function() {
		self.aclass('hidden');
		self.rclass('ui-clock-visible');
		visible = false;
		return self;
	};

	self.toggle = function(el, value, callback, offset) {

		if (self.older === el[0]) {
			if (!self.hclass('hidden')) {
				self.hide();
				return;
			}
		}

		self.older = el[0];
		self.activeMinutes = false;
		self.show(el, value, callback, offset);
		return self;
	};

	self.show = function(el, value, callback, offset) {

		setTimeout(function() {
			clearTimeout2('clockhide');
		}, 5);

		if (!el)
			return self.hide();

		var off = el.offset();
		var h = el.innerHeight();

		self.css({ left: off.left + (offset || 0), top: off.top + h + 12 });
		self.rclass('hidden');
		self.click = callback;
		self.time(value);
		visible = true;
		self.aclass('ui-clock-visible', 50);
		return self;
	};

	self.make = function() {

		self.aclass('ui-clock hidden');

		self.event('click', '.ui-clock-tick', function(e) {
			clearTimeout2('clockhide');
			e.preventDefault();
			e.stopPropagation();
			var val = this.getAttribute('data-value');

			if (!self.activeMinutes)
				return self.time(val, true);

			self.hide();
			self.click && self.click(val);
		});

		self.event('click', '.ui-clock-header-twelve, .ui-clock-swap', function(e) {
			clearTimeout2('clockhide');
			e.preventDefault();
			e.stopPropagation();

			var val = this.getAttribute('data-value');

			if (val.indexOf('PM') !== -1)
				val = val.replace('PM', 'AM');
			else
				val = val.replace('AM', 'PM');

			self.time(val, self.activeMinutes);
		});

		self.event('click', '.ui-clock-header-hours', function(e) {
			clearTimeout2('clockhide');
			e.preventDefault();
			e.stopPropagation();

			var val = this.getAttribute('data-value');
			self.time(val);
		});

		self.event('click', '.ui-clock-header-minutes', function(e) {
			clearTimeout2('clockhide');
			e.preventDefault();
			e.stopPropagation();

			var val = this.getAttribute('data-value');
			self.time(val, true);
		});

		self.event('click', '.ui-clock-header, .ui-clock-body', function(e) {
			e.stopPropagation();
		});

		$(window).on('scroll click', function() {
			visible && setTimeout2('clockhide', function() {
				EXEC('$clock.hide');
			}, 20);
		});

		window.$clock = self;

		self.on('reflow', function() {
			visible && EXEC('$clock.hide');
		});
	};

	self.time = function(value, showminutes) {
		showminutes = self.activeMinutes = showminutes || false;

		var hours, minutes, isAmPm = '', swapAmPm = '';
		var radian, radius, left, right, font;
		var hoursView = '';

		if (value instanceof Date)
			value = value.format('HH:mm');

		if (!value)
			value = new Date().format('HH:mm');

		value = value.split(':');
		hours = parseInt(value[0]);
		value = value[1].split(' ');
		minutes = parseInt(value[0]);

		if (value[1] != null)
			isAmPm = value[1];

		if (config.twelvehour && value[1] == null) {
			isAmPm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12 || 12;
		}

		if(hours < 10)
			hours = '0' + hours;

		if (minutes < 10)
			minutes = '0' + minutes;

		if (isAmPm !== '') {
			swapAmPm = isAmPm == 'PM' ? 'AM' : 'PM';
			isAmPm = ' ' + isAmPm;
		}

		if (showminutes) {

			for (i = 0; i < 60; i += 5) {
				radian = i / 30 * Math.PI;
				radius = outerRadius;
				left = (dialRadius + Math.sin(radian) * radius - tickRadius).toFixed(2);
				right = (dialRadius - Math.cos(radian) * radius - tickRadius).toFixed(2);
				font = '120';
				hoursView += '<div class="ui-clock-tick {0}" data-value="{1}:{2}{3}" style="left: {4}px; top: {5}px; font-size: {6}%;">{2}</div>'.format((i == minutes ? 'ui-clock-tick-selected' : ''), hours, (i < 10 ? '0' + i : i), isAmPm, left, right, font);
			}

		} else {

			if (config.twelvehour) {
				for (i = 1; i < 13; i += 1) {
					radian = i / 6 * Math.PI;
					radius = outerRadius;
					left = (dialRadius + Math.sin(radian) * radius - tickRadius).toFixed(2);
					right = (dialRadius - Math.cos(radian) * radius - tickRadius).toFixed(2);
					font = '120';
					hoursView += '<div class="ui-clock-tick {0}" data-value="{1}:{2}{3}" style="left: {4}px; top: {5}px; font-size: {6}%;">{7}</div>'.format((i == hours ? 'ui-clock-tick-selected' : ''), i, minutes, isAmPm, left, right, font, (i === 0 ? '00' : i));
				}
			} else {
				for (var i = 0; i < 24; i++) {
					radian = i / 6 * Math.PI;
					var inner = i > 0 && i < 13;
					radius = inner ? innerRadius : outerRadius;
					left = (dialRadius + Math.sin(radian) * radius - tickRadius).toFixed(2);
					right = (dialRadius - Math.cos(radian) * radius - tickRadius).toFixed(2);
					font = inner ? '120' : '100';
					hoursView += '<div class="ui-clock-tick {0}" data-value="{1}:{2}" style="left: {3}px; top: {4}px; font-size: {5}%;">{6}</div>'.format((i == hours ? 'ui-clock-tick-selected' : ''), i, minutes, left, right, font, (i === 0 ? '00' : i));
				}
			}
		}

		self.html('<div class="ui-clock-header"><a href="javascript:void(0)" class="ui-clock-header-hours {5}" data-value="{0}:{1}{2}" >{0}</a> : <a href="javascript:void(0)" class="ui-clock-header-minutes {6}" data-value="{0}:{1}{2}">{1}</a> <a href="javascript:void(0)" class="ui-clock-header-twelve" data-value="{0}:{1}{2}">{2}</a></div><div class="ui-clock-body"><div class="ui-clock-holder">{3}<a href="javascript:void(0)" class="ui-clock-swap" data-value="{0}:{1}{2}">{4}</a></div></div><div class="ui-clock-footer"><a href="javascript:void(0)">Close</a></div>'.format(hours, minutes, isAmPm, hoursView, swapAmPm, (!showminutes ? 'ui-clock-active' : ''), (showminutes ? 'ui-clock-active' : '')));
	};
});
