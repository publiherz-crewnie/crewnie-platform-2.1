import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-wizard-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    page = 'Personal';
    public _backPage = '';

    @Input()
    set backPage(backPage: string) {
        this._backPage = (backPage && backPage.trim()) || null;
      }

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(event => {
                let currentRoute = this.route.root;
                while (currentRoute.children[0] !== undefined) {
                    currentRoute = currentRoute.children[0];
                }
                this.page = currentRoute.snapshot.data['title'];
            })
    }
    goToBack() {
        this.router.navigateByUrl(this._backPage, { relativeTo: this.route.parent, skipLocationChange: true });
    }

}
