import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  type: string;
  mode:string[]=['Admin','Membres',"Public"];
  constructor(private route:Router) { }

  ngOnInit() {
    this.type = 'utilisateurs';
    
  }
  segmentChanged(ev:any){
    console.log('Segment changed',ev);
  }
  Mode(){
    // let mode = this.mode;
    // switch(mode){
    //   case Admin:{
    //     break;
    //   }
    // }
    this.route.navigate(['/admin']);
    // this.route.navigate(['/membres']);
    // this.route.navigate(['/public']);

  }
}
