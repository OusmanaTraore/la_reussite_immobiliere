import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  type: string;
  item:any;
  public mode:Array<string>=['Admin','Membres',"Public"];

  
  constructor(private route:Router) { }
  
  ngOnInit() {
    this.type = 'utilisateurs';
    
  }
  segmentChanged(ev:any){
    console.log('Segment changed',ev);
  }
  Mode(item){
    console.log(`Ce mode est ${item}`);
    // console.log(`Ce mode est ${this.mode[0]}`);
    // console.log(`Ce mode est ${this.mode[1]}`);
    // console.log(`Ce mode est ${this.mode[2]}`);
//     this.mode=
//     ['Admin','Membres',"Public"];
//  let mode = this.mode;
//           switch(mode){
//             case mode:
//               this.route.navigateByUrl('admin');
//               break;
              
//             case this.mode[0]:
//               this.route.navigateByUrl('membre');
//               break;
              
//             case mode[2]:
//               this.route.navigateByUrl('public');
//               break;
      
              
//             }
          

  }
}
