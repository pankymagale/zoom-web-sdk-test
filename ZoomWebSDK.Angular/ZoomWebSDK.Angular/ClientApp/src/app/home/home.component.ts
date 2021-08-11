import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    public participantUsername = '';
    public participantEmail = '';
    public meetingUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/blaank.html');

    constructor(private sanitizer: DomSanitizer) {

    }

    public ngOnInit(): void {
   
    }

    public joinMeeting(): void {
        this.meetingUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/meeting.html?' + 'u=' + this.participantUsername + '&e=' + this.participantEmail);
    }
}
