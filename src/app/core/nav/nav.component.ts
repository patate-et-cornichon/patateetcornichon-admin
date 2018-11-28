import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../auth/auth.interface';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  user: User;
  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
    );
  navigation = [
    {
      header: {
        title: 'Recettes',
        icon: 'fastfood',
      },
      links: [
        {
          title: 'Liste',
          link: '/recipes',
        },
        {
          title: 'Ajouter',
          link: '/recipes/add',
        },
        {
          title: 'Selections',
          link: '/recipes/selections',
        },
      ],
    },
    {
      header: {
        title: 'Blog',
        icon: 'local_library',
      },
      links: [
        {
          title: 'Liste',
          link: '/blog',
        },
        {
          title: 'Ajouter',
          link: '/blog/add',
        },
      ],
    },
    {
      header: {
        title: 'Commentaires',
        icon: 'mode_comment',
      },
      links: [
        {
          title: 'Liste',
          link: '/comments',
        },
      ],
    },
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  /**
   * Logout the curent user
   */
  logout() {
    this.authService.logout();
  }
}
