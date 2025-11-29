import { Routes } from "@angular/router";
import { LayoutComponent } from "@layouts/layout/layout.component";
import { AuthComponent } from "./views/auth/auth.component";
import { ProfileComponent } from "@views/profile/profile.component";

export const routes: Routes = [

  // Default redirect
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },




  // MAIN APP ROUTES (wrapped inside Layout)
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./views/views.route").then((m) => m.VIEWS_ROUTES),
      },
      {
        path: "",
        loadChildren: () =>
          import("./views/demo/demo-page.route").then((m) => m.DEMO_PAGE_ROUTES),
      },
    ],
  },

  // 404 (must be last)
  {
    path: "**",
    redirectTo: "home",
  },
];
