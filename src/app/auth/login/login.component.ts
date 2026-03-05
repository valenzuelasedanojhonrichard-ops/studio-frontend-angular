import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(
    private auth: AuthService,
    private router: Router   // 👈 AGREGAR
  ) {}

  login() {
    this.auth.login(this.username, this.password)
      .subscribe(res => {
        this.auth.saveToken(res.token);

        // 👇 FALTABA ESTO
        this.router.navigate(['/dashboard']);
      });
  }
}
