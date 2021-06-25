# ref-most-used

Maintain strong object references using LRU (and optional, generational LFU) cache logic/behavior.

## Example

```js
import RefMostUsed from "../ref-most-used/index.ts"

let r = new RefMostUsed(3)
let [ o1, o2, o3, o4 ] = [ {a:1}, {b:2}, {c:3}, {d:4} ]

r.use(o1)
r.has(o1) // #=> true
r.has(o2) // #=> false

// multi-generation, giving LRU/LFU behavior
r = new RefMostUsed(3, 2, 1)

r.use(o1).use(o2)
r.has(o1) // #=> true
r.promote.has(o1) // #=> false
r.promote.promote.has(o1) // #=> false

r.use(o1)
r.promote.has(o1) // #=> true
r.promote.promote.has(o1) // #=> false

r.use(o1)
r.promote.promote.has(o1) // #=> true

r.use(o2).use(o2)
r.promote.promote.has(o1) // #=> false
```

## References

* [hashlru](https://github.com/dominictarr/hashlru)

## License

This project is licensed under the terms of the [MIT license](LICENSE.txt).
