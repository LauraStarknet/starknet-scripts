function flickityInit() {

    if(Flickity) {

        Flickity.prototype.dragMove = function(t, e, i) {
                if (!this.isDraggable) {
                    return
                }
                t.preventDefault();
                xTo(e.clientX);
                yTo(e.clientY);
                xTo2(e.clientX);
                yTo2(e.clientY);
                this.previousDragX = this.dragX;
                var n = this.options.rightToLeft ? -1 : 1;
                if (this.options.wrapAround) {
                    i.x %= this.slideableWidth
                }
                var s = this.dragStartPosition + i.x * n;
                if (!this.options.wrapAround && this.slides.length) {
                    var r = Math.max(-this.slides[0].target, this.dragStartPosition);
                    s = s > r ? (s + r) * .5 : s;
                    var o = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                    s = s < o ? (s + o) * .5 : s
                }
                this.dragX = s;
                this.dragMoveTime = new Date;
                this.dispatchEvent("dragMove", t, [e, i])
            }
            ;
        
        Flickity.prototype.dragEnd =function(t, e) {
                if (!this.isDraggable) {
                    return
                }
                if (this.options.freeScroll) {
                    this.isFreeScrolling = true
                }
                console.log(e.clientX, e.clientY)
                xTo(e.clientX);
                yTo(e.clientY);
                xTo2(e.clientX);
                yTo2(e.clientY);
                var i = this.dragEndRestingSelect();
                if (this.options.freeScroll && !this.options.wrapAround) {
                    var n = this.getRestingPosition();
                    this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
                } else if (!this.options.freeScroll && i == this.selectedIndex) {
                    i += this.dragEndBoostSelect()
                }
                delete this.previousDragX;
                this.isDragSelect = this.options.wrapAround;
                this.select(i);
                delete this.isDragSelect;
                this.dispatchEvent("dragEnd", t, [e])
            };
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
   setTimeout(() => {
    flickityInit()
    }, 2000)
})

setTimeout(() => {
    flickityInit()
}, 2000)