import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 
  'home.page.html',

  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
  @ViewChild('slideWithNav3', { static: false }) slideWithNav3: IonSlides;
  
  sliderOne: any;
  sliderTwo: any;
  sliderThree: any;

  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    centeredSlides: true,
    slidesPerView: 1,
    autoplay: true
  };
  slideOptsTwo = {
    initialSlide: 1,
    slidesPerView: 2,
    loop: true,
    centeredSlides: true,
    spaceBetween: 10
  };
  slideOptsThree = {
    initialSlide: 0,
    slidesPerView: 3
  };

  constructor(private route:Router) {
     //Item object for Nature
     this.sliderOne =
     {
       isBeginningSlide: true,
       isEndSlide: false,
       slidesItems: [
         {
           id: "adrar",
           name:"adrar"
          },
         {
           id: "batiment",
           name:"batiment"
          },
          {
            id: "oasis",
            name:"oasis"
          },
          {
            id: "train",
            name:"train"
          },
          {
            id: "falaise",
            name:"falaise"
          },
          {
            id: "falaise2",
            name:"falaise2"
          },
          {
            id: "masjidIbnAbbas",
            name:"masjidIbnAbbas"
         },
          {
            id: "masjidSaoudien",
            name:"masjidSaoudien"
         },
          {
            id: "vue Nouakchott",
            name:"vue Nouakchott"
         },
          {
            id: "vue Aérienne",
            name:"vue Aérienne"
         },
         
         
       ]
     };
   }

  Menu(){
    this.route.navigate(['/menu'])
    
  }
 
   //Move to Next slide
   slideNext(object, slideView) {
     slideView.slideNext(500).then(() => {
       this.checkIfNavDisabled(object, slideView);
     });
   }
 
   //Move to previous slide
   slidePrev(object, slideView) {
     slideView.slidePrev(500).then(() => {
       this.checkIfNavDisabled(object, slideView);
     });;
   }
 
   //Method called when slide is changed by drag or navigation
   SlideDidChange(object, slideView) {
     this.checkIfNavDisabled(object, slideView);
   }
 
   //Call methods to check if slide is first or last to enable disbale navigation  
   checkIfNavDisabled(object, slideView) {
     this.checkisBeginning(object, slideView);
     this.checkisEnd(object, slideView);
   }
 
   checkisBeginning(object, slideView) {
     slideView.isBeginning().then((istrue) => {
       object.isBeginningSlide = istrue;
     });
   }
   checkisEnd(object, slideView) {
     slideView.isEnd().then((istrue) => {
       object.isEndSlide = istrue;
     });
   }
  }


