import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoAppModule } from './todo-app/todo-app.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TodoAppModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
