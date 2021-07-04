import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  // //ojo que el link href del head puede tener id!
  // public enlaceTema = document.querySelector('#theme');
 
  constructor(private settingsService:SettingsService) { }

  ngOnInit(): void {
    
    this.settingsService.checkCurrentTheme();
  
  }

  changeTheme(theme:string){
    this.settingsService.changeTheme(theme);
    
  }

  

}
