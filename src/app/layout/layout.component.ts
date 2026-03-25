import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  rol: string | null = '';

  constructor(private auth: AuthService){
    this.rol = this.auth.getRol();
  }

ngOnInit(){
  this.rol = localStorage.getItem('rol') || '';
}


}
