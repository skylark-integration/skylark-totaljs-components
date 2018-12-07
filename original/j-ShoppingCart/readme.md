## j-ShoppingCart

- singleton
- supports discount
- data are stored in localStorage

Example: `data-jc-config="discount:10"`

- `discount` {Number} a discount in percentage (optional, default: `0`)
- `expiration` {String} data expiration (default: `6 days`)

### Methods

- `instance.add(id, price, count, [name])` adds new product or increase count if the product exists
- `instance.upd(id, count)` updates product's count
- `instance.rem(id)` removes product
- `instance.has(id)` checks product
- `instance.read(id)` reads product
- `instance.clear()` clears all products
- `instance.clean()` removes all products with zero count
- `instance.sync(function(array_id_products, meta) {})` create data for synchronization with the server

### Global Events

- `ON('shoppingcart.add', function(item) {})`
- `ON('shoppingcart.upd', function(item) {})`
- `ON('shoppingcart.rem', function(id) {})`
- `ON('shoppingcart.sum', function(data) {})`
- `ON('shoppingcart.clear', function() {})`

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT