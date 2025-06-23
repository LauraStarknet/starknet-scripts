s.dragMove = function(t, e, i) {
        if (!this.isDraggable) {
            return
        }
        // t.preventDefault();
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