import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
	MatFormFieldModule,
	MatInputModule,
	MatToolbarModule,
	MatButtonModule
} from "@angular/material";


import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,

		HttpModule,
		FormsModule,
		ReactiveFormsModule,

		MatToolbarModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
