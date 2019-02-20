## j-LineChart

Please review an example and keep a data-source.

__Configuration__:

- `offsetX` {Number} An offset X for value tooltip (default: `10`)
- `offsetY` {Number} An offset Y for value tooltip (default: `10`)
- `templateX` {String} Tangular template for X axis (default: `{{ value }}`)
- `templateY` {String} Tangular template for Y axis (default: `{{ value | format(0) }}`)
- `selected` {String} Tangular template for selected values (default: `{{ value | format(0) }}`)
- `height` {Number} height (default: `0` = auto-height)
- `width` {Number} width (default: `0` = auto-width)
- `limit` {Number} a maximum limit of value for Y axis (default: `0`)
- `fill` {Boolean} enables filling (default: `false`)
- `fillopacity` {Number} filling opacity (default: `0.1`)
- `point` {Number} size of `point` (default: `5`)
- `pl` {Number} lines left padding (default: `10`)
- `pr` {Number} lines right padding (default: `10`)
- `pt` {Number} lines top padding (default: `10`)
- `pb` {Number} lines bottom padding (default: `25`)
- `type` {String} lines type, can be `normal`, `curves` or `step` (default: `normal`)
- `prselected` {Number} right padding for selected value (default: `0`)
- `avg` {Number} average value (chart renders a new black line)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT