// import { Component } from '@angular/core';

// @Component({
//   selector: 'ngx-text-igniter',
//   templateUrl: './text-igniter.component.html',
//   styles: ``,
//   standalone: false
// })
// export class TextIgniterComponent {

// }


import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'ngx-text-igniter',
  // template: '<text-igniter #builder *ngIf="componentReady"></text-igniter>', 
  template: '<text-igniter  #builder ></text-igniter>', 
  standalone: false
})
export class TextIgniterComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() config: any;
  @ViewChild('builder', { static: false }) builderRef!: ElementRef;
  componentReady = false;

  ngOnInit(): void {
    
    import('@mindfiredigital/textigniter-web-component' as any)
      .then(() => {
        
        this.componentReady = true;
        console.log('Web component loaded successfully. vicky',this.componentReady);
      })
      .catch((error) => {
        console.error('Failed to load web component:', error);
      });
  }

  ngAfterViewInit(): void {
    
    setTimeout(() => {
      if (this.config && this.builderRef?.nativeElement) {
        try {
          const configString = JSON.stringify(this.config);
          console.log('Web component loaded successfully. vicky 11',this.componentReady);
          this.builderRef.nativeElement.setAttribute('config', configString);
          // this.componentReady = true;
        } catch (error) {
          console.error('Error setting config-data:', error);
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['config'] && this.builderRef?.nativeElement) {
      try {
        const configString = JSON.stringify(this.config);
        this.builderRef.nativeElement.setAttribute('config', configString);
        // this.componentReady = true;
      } catch (error) {
        console.error('Error updating config-data:', error);
      }
    }
  }
}
