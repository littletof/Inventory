import {Component, EventEmitter, OnInit} from '@angular/core';
import {MatChipInputEvent} from "@angular/material";
import {SPACE} from "@angular/cdk/keycodes";

@Component({
  selector: 'chip-search-input',
  templateUrl: './chip-search-input.component.html',
  styleUrls: ['./chip-search-input.component.css'],

  outputs: ['searchTags']
})
export class ChipSearchInputComponent implements OnInit {

  public searchTags = new EventEmitter<any>();

    filterChips:any[] = [];
    search:string;

  constructor() {

  }

  ngOnInit() {
  }

  update(any){
    let fields = [];
    if(this.filterChips) {
        this.filterChips.forEach(chip => fields.push(chip));
    }
    fields.push(this.search);
    this.searchTags.next(fields);
  }



    selectable: boolean = false;
    removable: boolean = true;
    addOnBlur: boolean = true;

    separatorKeysCodes = [SPACE];


    add(event: MatChipInputEvent): void {
        let input = event.input;
        let value = event.value;

        // Add our tag
        value.split(String.fromCharCode(SPACE)).forEach(val => {
            if ((val || '').trim()) {
                this.filterChips.push(val.trim());
                // console.log(this.filter);
            }
        });


        // Reset the input value
        if (input) {
            input.value = '';
            this.search = "";
        }
    }

    remove(tag: any): void {
        let index = this.filterChips.indexOf(tag);

        if (index >= 0) {
            this.filterChips.splice(index, 1);
        }

        this.update(null);
    }

}
