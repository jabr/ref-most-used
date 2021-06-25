type Optional<V> = V | undefined

// Stores references for [0,2*maxSize) most recently used objects.
// Optionally promotes frequently used objects to subsequent generations.
export default class RefMostUsed {
    maxSize: number
    promote: Optional<RefMostUsed> = undefined
    current = new Set
    previous = new Set

    constructor(maxSize: number = 100, ...generations: number[]) {
        this.maxSize = maxSize
        let [ next, ...remaining ] = generations
        if (next) this.promote = new RefMostUsed(next, ...remaining)
    }

    has(o: object): boolean {
        return (this.current.has(o) || this.previous.has(o))
    }

    use(o: object) {
        // promote the object to the next generation?
        if (this.promote && this.has(o)) this.promote.use(o)

        this.current.add(o)

        // is the current set full?
        if (this.current.size >= this.maxSize) {
            // rotate the current/previous sets...
            const p = this.previous
            this.previous = this.current
            this.current = p
            // ...then clear the "new" current
            p.clear()
        }

        return this
    }
}
