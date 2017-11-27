import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	
	private searchHashtagFG: FormGroup;
	public tweets;


	constructor(private http: Http, fb: FormBuilder) {
		this.searchHashtagFG = fb.group({
			hashtag: new FormControl()
		});
	}


	async searchAndCount() {
		console.log(this.searchHashtagFG.get("hashtag").value);


		let headers = new Headers();
		headers.append("Content-Type", "application/X-www-form-urlencoded");

		this.http.post('http://localhost:1337/api/authorize', { headers: headers }).subscribe((res) => {

			// App should be authorized, proceed
			if (res.json().success && typeof res.json().data == "string") {

				let searchterm = 'query=' + this.searchHashtagFG.get("hashtag").value;

				this.http.post('http://localhost:1337/api/search', searchterm, { headers: headers }).subscribe((res) => {

					this.tweets = res.json().data.statuses;
					console.log(this.tweets);
				});

			} else {
				alert("Something went wrong :(");
			}
		})
		
	}

}