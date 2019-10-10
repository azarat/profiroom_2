import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categoryData: Observable<any>;
  selectedCategory: string;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categoryData = this.route.paramMap
      .pipe(
        switchMap(params => {
          this.selectedCategory = params.get('category');
          console.log(this.selectedCategory);
          return this.selectedCategory;
        })
      )

  }

}
