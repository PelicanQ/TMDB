 export const Debounce = { //Not working in the context I want
    debounceTime : 1000,
    timer : undefined,
    debounce(func) {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                console.log("Calling after time")
                func()
                this.timer = undefined
            }, this.debounceTime)
        }
        else {
            this.timer = true
            setTimeout(() => {
                this.timer = undefined
            }, this.debounceTime)
            func()
            console.log("Calling immediatly")
        }
    }
}

export default Debounce