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

						if (this.getUserIndex(tweet.user.id_str) >= 0) {
							this.structeredTweets[this.getUserIndex(tweet.user.id_str)].count++;
						} else {
							this.structeredTweets.push({
								screen_name: tweet.user.screen_name,
								id_str: tweet.user.id_str,
								profile_image_url_https: tweet.user.profile_image_url_https,

								count: 1
							});
						}
					}


					// Order by count asc
					this.structeredTweets.sort(function (a, b) {
						return (a.count < b.count) ? 1 : (
							(a.count > b.count) ? -1 : 0
						);
					});

					console.log("Sorted results:", this.structeredTweets);

					this.haveToShowResults = true;
					this.showProgressBar = false;
				});

			} else {
				alert("Something went wrong :(");
			}
		})
		
	}


	/**
	 * This method will return the index of the user in the structeredTweets array.
	 * If he's not already been added, this method will return -1.
	 * @param {number} id_str
	 */
	private getUserIndex(id_str: string): number {
		for (let i = 0; i < this.structeredTweets.length; i++) {
			if (this.structeredTweets[i].id_str == id_str) {
				return i;
			}
		}

		return -1;
	}
}