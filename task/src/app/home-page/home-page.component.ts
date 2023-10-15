import { HttpClient } from '@angular/common/http';
import { Component,Input, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms'
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
 
  username ="abhijeet";
  jsonData : any;
  newArray : any;
  isClicked: boolean = false;
  public post !: FormGroup;
  likes : number= 0;
  commentText: string = '';
  // @Input() receivedData: string;
  comments : any
  newArray1 : any;

  constructor(private formBulider : FormBuilder,private http : HttpClient) { }

  ngOnInit() {
    this.post = this.formBulider.group({
      caption:[''],
      image:[],
  
    })
    this.http.get<any[]>('http://localhost:3000/post')  
      .subscribe(data => {
        this.jsonData = data;
        this.newArray=this.jsonData.map((element)=>{
          return element;
        });
        console.log(this.newArray)
      });
      this.http.get<any[]>('http://localhost:3000/comment')  
      .subscribe(data => {
        this.comments = data;
        this.newArray1=this.comments.map((element)=>{
          return element;
        });
        console.log(this.newArray1)
      });
  }
  postImage(){
    this.http.post<any>("http://localhost:3000/post",this.post.value)
      .subscribe(res=>{
          alert("image posted!")
          this.post.reset();
        },err=>{
          alert("something is wrong")
      })
  }
  saveComment() {
    const comment = { text: this.commentText }; // Create an object to send to the server
    this.http.post('http://localhost:3000/comment', comment)
      .subscribe(
        (response) => {
          console.log('Comment saved successfully:', response);
          // Optionally, you can reset the input field after successful submission
          this.commentText = '';
        },
        (error) => {
          console.error('Error saving comment:', error);
        }
      );
  }
  onHeartClick() {
    this.isClicked = !this.isClicked; 
    if(this.isClicked=true){
      this.likes=this.likes+1;
    }
  }

}