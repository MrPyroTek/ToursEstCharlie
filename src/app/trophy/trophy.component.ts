import { Component } from '@angular/core';
import { TrophyService } from '../trophy.service';
import { Trophy } from '../trophy.service';  // Import Trophy interface

@Component({
  selector: 'app-trophy',
  templateUrl: './trophy.component.html',
  styleUrls: ['./trophy.component.scss']
})
export class TrophyComponent {
  trophyName: string = '';

  constructor(private trophyService: TrophyService) {}

  addTrophy() {
    if (this.trophyName.trim()) {
      // Generate a unique key or handle key generation as needed
      const newTrophy: Trophy = {
        key: '',  // Firebase will generate the key automatically, or handle key generation
        name: this.trophyName,
        description: ''  // You can set a default description or leave it empty
      };

      // Push the trophy to the database
      this.trophyService.addTrophy(newTrophy).then(() => {
        this.trophyName = ''; // Reset input field
      }).catch(error => {
        console.error('Error adding trophy:', error);
      });
    }
  }
}
