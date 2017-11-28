import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";

import { StructuredTweet } from "./Types/StructeredTweet";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	
	private searchHashtagFG: FormGroup;
	public tweets;
	public structeredTweets = [];

	public haveToShowResults = false;
	public showProgressBar = false;

	constructor(private http: Http, fb: FormBuilder) {
		this.searchHashtagFG = fb.group({
			hashtag: new FormControl()
		});
	}


	async searchAndCount() {
		this.showProgressBar = true;

		console.log("Searching with hashtag:", this.searchHashtagFG.get("hashtag").value);


		let headers = new Headers();
		headers.append("Content-Type", "application/X-www-form-urlencoded");

		this.http.post('http://localhost:1337/api/authorize', { headers: headers }).subscribe((res) => {

			// App should be authorized, proceed
			if (res.json().success && typeof res.json().data == "string") {

				let searchterm = 'query=' + this.searchHashtagFG.get("hashtag").value;

				this.http.post('http://localhost:1337/api/search', searchterm, { headers: headers }).subscribe((res) => {

					this.tweets = res.json().data.statuses;

					for (let tweet of this.tweets) {

						// If the user has already been added, update his tweets counter
						if (this.structeredTweets["Id_" + tweet.user.id_str]) {
							this.structeredTweets["Id_" + tweet.user.id_str].count++;
						} else {
							// Otherwise add him to the array
							this.structeredTweets["Id_" + tweet.user.id_str] = {
								screen_name: tweet.user.screen_name,
								id_str: tweet.user.id_str,
								profile_image_url_https: tweet.user.profile_image_url_https,

								count: 1,
							};
						}
					}


					console.log("Results found:", this.structeredTweets);

					this.haveToShowResults = true;
					this.showProgressBar = false;
				});

			} else {
				alert("Something went wrong :(");
			}
		})
		
	}



	public getKeys(array) {
		var keys = [];
		for (var key in array) {
			if (array.hasOwnProperty(key)) {
				keys.push(key);
			}
		}

		return keys;
	}
}