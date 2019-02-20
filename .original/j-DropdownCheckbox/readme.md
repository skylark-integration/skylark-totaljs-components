## j-DropdownCheckbox

__Configuration__:

Example: `data-jc-config="required:true;icon:envelope"`

- `required` {Boolean} (optional) enables "required" (default: `false`)
- `items` {String} (optional) static items `key1|value1, key2 with value, key3|value`
- `icon` {String} (optional) icon for label without `fa-` e.g. `home`, `cog`, etc.
- `checkicon` {String} (optional) check icon without `fa-`, (default: `check`).
- `label` {String} (optional) label (default is HTML content)
- `datasource` {String} path to data-source (must be array)
- `text` {String} determines a property name for text (in data-source), default: `name`
- `value` {String} determines a property name for value (in data-source) default :`id`
- `disabled` {Boolean} (optional) disables this component
- `cleaner` {Boolean} (optional) removes non-exist values (default: `true`)
- `limit` {Number} (optional) sets a limit for selected items (default: `0`)
- `visible` {Number} (optional) sets a maximum visible items then show `X selected` (default: `0`)
- `selectedtext` {String} (optional) sets a message for maximum visible items e.g. `{0} selected from {1}` (default: `{0} selected`)
- `alltext` {String} (optional) when all items are selected this is showed (default: `All selected` you can disable it with `null`)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT