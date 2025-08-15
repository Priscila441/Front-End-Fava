import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { UserPostDto } from '../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    const dto: UserPostDto = {
      NameUser: this.name,
      Email: this.email,
      Password: this.password
    };

    this.userService.createUser(dto).subscribe({
      next: () => this.router.navigateByUrl('/auth'),
      error: err => this.error = err.error?.message || 'Error al crear usuario'
    });
  }
}
