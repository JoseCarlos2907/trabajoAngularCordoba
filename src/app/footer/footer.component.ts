import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  currentDate: string = "";

  ngOnInit(): void {
    let date = new Date();
    this.currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  }
}
