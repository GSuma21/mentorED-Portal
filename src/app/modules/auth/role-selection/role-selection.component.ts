import { Component, OnInit } from "@angular/core"
import { Router } from '@angular/router';

@Component({
  selector: "app-role-selection",
  templateUrl: "./role-selection.component.html",
  styleUrls: ["./role-selection.component.scss"],
})
export class RoleSelectionComponent implements OnInit {
  buttonEnable = false

  roleList = [
    {
      role: "I'am a Mentor",
      description: "Build confidence as a leader, and grow your network.",
      image: "../../../../assets/images/role-selection/mentor_icon.png",
    },
    {
      role: "I'am a Mentee",
      description: "Learn and grow from verified Mentors",
      image: "../../../../assets/images/role-selection/mentee_icon.png",
    },
  ]
  selectedRole: any
  userType: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  cardOneSelected(event: any) {
    this.selectedRole=event.role
    this.buttonEnable = true
  }
  buttonClick() {
    this.router.navigate(['./auth/register'],{queryParams:{ selectedRole: this.selectedRole }})
  }
}
