class Cell {
	
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
        
		this.w = w;
		this.h = h;
        
        this.selected = false;
        this.visited = false;
		this.top     = true;		
		this.right   = true;
        this.bottom  = true;
        this.left    = true;
	}
	
	show() {
        noStroke();
        if(this.visited) {
			fill(220);
            rect(this.x, this.y, this.w, this.h);
        }
        if(this.selected) {
            
            fill(255, 0, 0, 220);
            rect(this.x, this.y, this.w, this.h);
        }
        stroke(0);

        //Top wall
        if(this.top)    line(this.x, this.y,
                             this.x + this.w, this.y);

        //Right wall
        if(this.right)  line(this.x + this.w, this.y,
                             this.x + this.w, this.y + this.h);

        //Bottom wall
        if(this.bottom)  line(this.x + this.w, this.y + this.h,
                              this.x, this.y + this.h);

        //Left wall
        if(this.left)    line(this.x, this.y + this.h,
                              this.x, this.y);
        
		
	}
	
}