import { Routes } from "@angular/router";
import { LayoutComponent } from "@layouts/layout/layout.component";

export const routes: Routes = [
	{
		path: "",
		redirectTo: "/home",
		pathMatch: "full",
	},
	{
		path: "",
		component: LayoutComponent,
		loadChildren: () => import("./views/views.route").then((mod) => mod.VIEWS_ROUTES),
	},
	{
		path: "",
		loadChildren: () => import("./views/demo/demo-page.route").then((mod) => mod.DEMO_PAGE_ROUTES),
	},
	{
		path: "**",
		redirectTo: "/home", // or use a 404 component
	},
];
