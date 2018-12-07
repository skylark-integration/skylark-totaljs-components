## j-Panel

- Works only with `+v11.1.0` [jComponent](http://jcomponent.org)
- __Download__ [jComponent with Tangular (jcta.min.js)](https://github.com/petersirka/jComponent)
- Works with Bootstrap

__Configuration__:

Example: `data-jc-config="title:Panel title;if:user;icon:home"`

- `title` {String} window title
- `if` {String} condition for showing of the window, it's compared with the value within of `data-jc-path`
- `icon` {String} Font-Awesome icon without `fa-`
- `reload` {String} link to a global function and it's executed if the form is showing
- `enter` {Boolean} (optional) captures `enter` key automatically and performs submit (default: `false`)
- `autofocus` {Boolean/String} (optional) can focus an input. `String` === `jQuery selector` for the input
- `default` {String} (optional) a short alias for `DEFAULT(default, true)`
- `closebutton` {Boolean} (optional) can hide `x` button (default: `false`)
- `width` {Number} (optional) a default width of the panel (default: `300`)
- __NEW__: `bg` {Boolean} (optional) can disable `background` (default: `true`)
- __NEW__: `bgclose` {Boolean} (optional) if the user click on the background then the panel will be closed (default: `false`)
- __NEW__: `zindex` {Number} (optional) can affect z-index (default: `12`)
- __NEW__: `close` {String} (optional) path/method is executed as `path_to_method(com)` when the user closes the panel manually via close button

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT