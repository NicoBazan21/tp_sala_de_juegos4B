import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserServiceService, private router: Router,
    private toastr: ToastrService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.userService.sesionFirestore.mail == 'nicolasdarkar@gmail.com')
      {
        return true;
      }
      this.toastr.error('Error!.', 'Solo administradores',
      {
        tapToDismiss: true,
        progressBar: true,
        progressAnimation:'increasing',
        payload:true,
        positionClass: 'toast-top-right'
      });
      this.router.navigateByUrl("listas");
      return false;
  }
}
