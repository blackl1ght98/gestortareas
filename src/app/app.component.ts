import { Component, OnInit } from '@angular/core';
import { DarkModeService } from './services/dark-mode-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TareasVersion1.1';
  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.isDarkMode.subscribe((isDarkMode: boolean) => {
      if (isDarkMode) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-bs-theme');
      }
    });
  }
}
