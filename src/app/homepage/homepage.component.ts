import { Component, HostListener } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  dark: boolean = false;
  menubar: boolean = false;

  activeSection: string = ''; // To track the active section

  // Boolean to toggle button visibility
  isVisible: boolean = false;

  // Listen for the scroll event and check scroll position
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // If the page is scrolled more than 100px, show the button
    this.isVisible = window.scrollY > 100;
  }

  constructor() {}

  gotoTop() {
    try {
      let scrollElem: any = document.querySelector('#movetoTop');
      scrollElem.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    } catch (x) {
      console.log(x);
    }
  }

  gotohome(sectionId: string) {
    try {
      this.activeSection = sectionId;
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
      }
    } catch (x) {
      console.log(x);
    }
  }

  gotofeature(sectionId: string) {
    try {
      this.activeSection = sectionId;
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
      }
    } catch (x) {
      console.log(x);
    }
  }

  gotoclient(sectionId: string) {
    try {
      this.activeSection = sectionId;
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
      }
    } catch (x) {
      console.log(x);
    }
  }

  gootoreview(sectionId: string) {
    try {
      this.activeSection = sectionId;
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
      }
    } catch (x) {
      console.log(x);
    }
  }

  gotointegration(sectionId: string) {
    try {
      this.activeSection = sectionId;
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
      }
    } catch (x) {
      console.log(x);
    }
  }

  darkapp() {
    // alert("As")
    this.dark = !this.dark;
  }

  menuclick() {
    this.menubar = !this.menubar;
    // alert(this.menubar);
  }
}
