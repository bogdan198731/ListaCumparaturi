import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomStringSort {
    public static sortByPriority(array: string[]): string[] {
      return array.sort((a, b) => {
        // Assuming 'priority' is a numeric property in the objects
        const priorityA = a.toLowerCase();
        const priorityB = b.toLowerCase();
  
        // Compare the priorities
        if (priorityA < priorityB) {
          return -1;
        } else if (priorityA > priorityB) {
          return 1;
        } else {
          return 0; // priorities are equal
        }
      });
    }
  }