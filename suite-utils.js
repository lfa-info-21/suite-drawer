class Suite {

    constructor() { throw 'basic suite class isn\'t implemented' }
    get (n) {       throw 'basic suite class isn\'t implemented' }

}

class RecurrenceSuite {

    constructor(base_u=[0], f=(x) => x) {
        this.reccurence_count = base_u.length
        this.cached           = base_u
        this.function         = f
    }
    get(n) {
        if (n < 0) throw 'a suite only accepts numbers in N'

        if (this.cached.length > n) return this.cached[n]

        // Build previous occurences
        while (this.cached.length < n) {
            this.get(this.cached.length)
        }

        let next_arr = this.cached.slice(n - this.reccurence_count, n)

        this.cached.push(this.function.apply(null, next_arr))

        return this.cached[this.cached.length - 1]
    }

}

class SuiteDrawer {

    constructor (suite, modifier=null) {
        this.suite = suite
        this.modifier = modifier
    }

    draw(canvas, color, n0, n1=-1, reset=false) {
        if (n0 < 0) {
            throw 'A suite only accepts numbers in N'
        }

        if (n1 == -1) {
            n1 = n0
            n0 = 0
        }

        let arr = new Array()
        if (this.suite instanceof RecurrenceSuite) {
            this.suite.get(n1)

            arr = this.suite.cached.slice(n0, n1 + 1)
        } else {
            for (let i = n0; i <= n1; i++) {
                arr.push(this.suite.get(i))
            }
        }

        canvas.draw(color, this.modifier ? this.modifier(arr) : arr)
    }

}

class SuiteCanvas {
    constructor(element, size, origin, scale) {
        this.element = element
        this.width  = size[0]
        this.height = size[1]
        this.ox = origin[0]
        this.oy = origin[1]

        if (this.ox > this.width || this.ox < 0) this.ox = this.width/2
        if (this.oy > this.height || this.oy < 0) this.oy = this.height/2

        this.scalex = scale[0] > 0 ? scale[0] : 20
        this.scaley = scale[1] > 0 ? scale[1] : 20
    }

    drawQuad(axisColor, QuadColor="#ffffff", axislw=1, quadlw=1) {
        const ctx = this.element.getContext("2d")
        
        ctx.fillStyle = "#ffffff"
        ctx.clearRect(0,0,this.width, this.height)

        if (QuadColor != "#ffffff") {
            ctx.lineWidth = quadlw
            ctx.strokeStyle = QuadColor

            let sx = - Math.floor((this.ox) / this.scalex) * this.scalex + this.ox
            let ex = Math.ceil((this.width - this.ox) / this.scalex) * this.scalex + this.ox
            let sy = - Math.floor((this.oy) / this.scaley) * this.scaley + this.oy
            let ey = Math.ceil((this.height - this.oy) / this.scaley) * this.scaley + this.oy

            for (let x = sx; x <= ex; x+=this.scalex) {
                if (x == this.ox) {continue}
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, this.height)
                ctx.stroke()
            }
            for (let y = sy; y <= ey; y+=this.scaley) {
                if (y == this.oy) {continue}
                ctx.beginPath()
                ctx.moveTo(0,          y)
                ctx.lineTo(this.width, y)
                ctx.stroke()
            }
        }

        ctx.lineWidth = axislw
        ctx.strokeStyle = axisColor

        ctx.beginPath()
        ctx.moveTo(0,          this.oy)
        ctx.lineTo(this.width, this.oy)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(this.ox, 0)
        ctx.lineTo(this.ox, this.height)
        ctx.stroke()
    }

    mapX(x) {
        return this.ox + this.scalex * x
    }
    mapY(y) {
        return this.oy + this.scaley * y
    }

    draw(color, arr, lwidth=2) {
        for (let i = 0; i < arr.length; i++) {
            if (!(arr[i] instanceof Array)) {
                arr[i] = [arr[i], i]
            }
        }

        const ctx = this.element.getContext("2d")
        ctx.strokeStyle = color
        ctx.lineWidth = lwidth

        for (let i = 1; i < arr.length; i++) {
            ctx.beginPath()
            ctx.moveTo(this.mapX(arr[i - 1][0]), this.mapY(arr[i - 1][1]))
            ctx.lineTo(this.mapX(arr[i][0]), this.mapY(arr[i][1]))
            ctx.stroke()
        }
    }
}


const DEFAULT_MODIFIERS = {
    ACT_WITH_LAST_MAPPER:function (arr) {
        if (arr.length == 0) return []

        let next = new Array()

        for (let i = 1; i < arr.length; i++) {
            next.push(
                [
                    arr[i - 1],
                    arr[i]
                ]
            )
        }

        return next
    }
}


