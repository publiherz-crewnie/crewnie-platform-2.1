import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crewnies-page',
  templateUrl: './crewnies-page.component.html',
  styleUrls: ['./crewnies-page.component.scss']
})

export class CrewniesPage implements OnInit {
  items = [0,0,0,0,0,0,0,0,0];
  certifications = [0,0,0,0,0];

  constructor(){
  }

  ngOnInit(){
    $.getScript('https://platform.twitter.com/widgets.js');
  }
}
