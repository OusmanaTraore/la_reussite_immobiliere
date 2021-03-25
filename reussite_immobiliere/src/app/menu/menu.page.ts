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
  public admin:any=[
    {
      nom:'Bâ',
      prenom:'Aissata',
      matricule:'207-AA-312',
      email:'aissat@yahoo.fr',
      telephone: '243-76-98-37',
      role:'ADMINISTRATEUR'
    },
    {
      nom:'Ndoudy Elys',
      prenom:'Patrick',
      matricule:'207-AA-318',
      email:"patric@yahoo.fr",
      telephone: '243-76-98-38',
      role:'ADMINISTRATEUR'
    },
    {
      nom:"Strerg",
      prenom:'Marc',
      matricule:'207-AA-318',
      email:"marc@yahoo.fr",
      telephone: '243-76-98-39',
      role:'ADMINISTRATEUR'
    }
  ];
  public mode:Array<string>=['Admin','Membres',"Public"];

  
  constructor(private route:Router) { 
    this.type ='utilisateurs';

  }
  
  ngOnInit() {
    this.type = 'utilisateurs';
    
  }
  segmentChanged(ev:any){
    console.log('Segment changed',ev);
  }
  Mode(item){
    console.log(`Ce mode est ${item}`);
     switch(item){
       case item="Admin":
         this.route.navigateByUrl('admin');
         break;
       case item="Membres":
          this.route.navigateByUrl('membre');
          break;
        case item="Public":
           this.route.navigateByUrl('public');
           break;
        default:
          this.route.navigateByUrl('menu');

     }
          

  }
}
