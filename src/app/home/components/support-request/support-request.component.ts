import { CreateSupportAction } from './../../../actions/support.actions';
import { LoadReasonAction } from './../../../actions/reason.actions';
import { AppState } from 'src/app/models/app-state';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reason } from 'src/app/models/reason';

@Component({
  selector: 'app-support-request',
  templateUrl: './support-request.component.html',
  styleUrls: ['./support-request.component.css'],
})
export class SupportRequestComponent implements OnInit {
  supportForm: FormGroup;
  reasons$: Observable<Reason[]>;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.reasons$ = store.select((app) => app.reason.list);
  }

  ngOnInit(): void {
    this.supportForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(
            '^([a-zA-Z0-9]\\_?\\.?)+\\@([a-zA-Z0-9]\\-?)+(\\.([a-z0-9])+)+$'
          ),
        ],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^0{1}[0-9]{9}$')],
      ],
      reason: this.formBuilder.group({
        id: [1],
        name: [''],
      }),
      content: ['', [Validators.required, Validators.maxLength(65535)]],
      status: [''],
    });
    this.store.dispatch(new LoadReasonAction());
  }

  onSubmit() {
    if (this.supportForm.valid) {
      this.store.dispatch(new CreateSupportAction(this.supportForm.value));
    }
  }

  openModal(targetModal, event) {
    if (this.supportForm.valid) {
      event.preventDefault();
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: 'static',
      });
    } else {
      this.modalService.dismissAll();
    }
  }
}
