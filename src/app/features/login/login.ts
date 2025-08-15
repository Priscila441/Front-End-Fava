import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
  this.userService.login(this.email, this.password).subscribe({
    next: user => {
      this.authService.setUser(user);
      alert('¡Bienvenido!');
      const redirect = this.authService.isAdmin() ? '/admin' : '/';
      
      this.router.navigateByUrl(redirect);
    },
    error: () => {
      this.error = 'Email o contraseña incorrectos';
    }
  });
}


}
