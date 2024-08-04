import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DamageTemplateComponent } from './damage-template/damage-template.component';
import { GoogleDriveScreenComponent } from './google-drive-screen/google-drive-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DamageTemplateComponent, GoogleDriveScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'syntranet';
}
