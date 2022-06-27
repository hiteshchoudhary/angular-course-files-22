import { Component, Input, OnChanges } from '@angular/core';
import {
  faThumbsUp,
  faThumbsDown,
  faShareSquare,
} from '@fortawesome/free-regular-svg-icons';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnChanges {
  faShareSquare = faShareSquare;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  @Input() post;

  uid = null;

  // to hold initial downvote and upvote
  upvote = 0;
  downvote = 0;

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.auth.getUser().subscribe((user) => {
      // setting the uid as soon as getting from service
      this.uid = user?.uid;
    });
  }

  // handling when onChange
  ngOnChanges(): void {
    // when the post had vote
    if (this.post.vote) {
      // changing to array and mapping through it
      Object.values(this.post.vote).map((val: any) => {
        console.log(val);
        // eg:- upvote: 1
        if (val.upvote) {
          // when their is upvote element then adding upvote to one
          this.upvote += 1;
        }
        if (val.downvote) {
          // when their is downvote element then adding downvote to one
          this.downvote += 1;
        }
      });
    }
  }

  getInstaUrl() {
    return `https://instagram.com/${this.post.instaId}`;
  }
  visitPlace() {
    return `http://maps.google.com/?q=${this.post.locationName}`;
  }

  upvotePost() {
    console.log('upvotiing');
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      upvote: 1,
    });
  }
  downvotePost() {
    console.log('downvoteing');
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      downvote: 1,
    });
  }
}
