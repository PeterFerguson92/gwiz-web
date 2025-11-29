// 🔐 Auth routes – same component, different URLs

import { Routes } from "@angular/router";
import { AuthComponent } from "@views/auth/auth.component";
import { ProfileComponent } from "@views/profile/profile.component";

export const AUTH_ROUTES: Routes = [
	{
		path: "login",
		component: AuthComponent,
	},
	{
		path: "signup",
		component: AuthComponent,
	},
	{
		path: "profile",
		component: ProfileComponent,
		// canActivate: [AuthGuard], // once you add a guard
	},
];
