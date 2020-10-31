import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css'],
})
export class AdvancedSearchComponent implements OnInit {
  @ContentChild('advancedSearch') advancedSearch: TemplateRef<any>;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}
}
