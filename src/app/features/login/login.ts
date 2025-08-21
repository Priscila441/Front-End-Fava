import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

    login() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        // Obtenemos la URL a la que el usuario quería ir antes de loguearse
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else if (returnUrl) {
          this.router.navigateByUrl(returnUrl);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: err => {
        console.error(err);
        alert('Credenciales incorrectas');
      }
    });
  }



}
