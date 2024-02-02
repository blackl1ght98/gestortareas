import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../services/dark-mode-service.service';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isDarkMode: boolean = false;
  welcomeMessage: string = '';
  constructor(
    private darkModeService: DarkModeService,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.darkModeService.isDarkMode.subscribe((isDarkMode: boolean) => {
      this.isDarkMode = isDarkMode;
    });
    this.messageService.welcomeMessage$.subscribe((message) => {
      this.welcomeMessage = message;
    });
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
  logout() {
    this.userService.logout().then(() => {
      // Borra el mensaje de bienvenida cuando el usuario cierra la sesión
      this.messageService.sendWelcomeMessage('');
    });
  }
}
