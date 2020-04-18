import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip'
import { HttpClientModule } from '@angular/common/http';
import { JarListComponent } from './jar-list/jar-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProjectEditorComponent } from './project-editor/project-editor.component';
import { ConfigEditorComponent } from './config-editor/config-editor.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { JsonInputComponent } from './json-input/json-input.component'
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListClassesComponent } from './select-jar/select-jar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SelectPackageComponent } from './select-package/select-package.component';
import { SelectClassComponent } from './select-class/select-class.component'
const appRoutes: Routes = [
  {
    path: 'jars',
    component: JarListComponent
  },
  {
    path: 'projects',
    component: ProjectListComponent
  },
  {
    path: 'project/:id',
    component: ProjectEditorComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    JarListComponent,
    ProjectEditorComponent,
    ConfigEditorComponent,
    ProjectListComponent,
    JsonInputComponent,
    ListClassesComponent,
    SelectPackageComponent,
    SelectClassComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
