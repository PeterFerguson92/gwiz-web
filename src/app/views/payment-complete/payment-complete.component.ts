import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

type PaymentCompleteStatus = 'success' | 'processing' | 'failed' | 'unknown';

@Component({
  selector: 'app-payment-complete',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-complete.component.html',
  styleUrls: ['./payment-complete.component.scss'],
})
export class PaymentCompleteComponent implements OnInit {
  status: PaymentCompleteStatus = 'unknown';
  message = 'Processing your payment…';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const redirectStatus = this.route.snapshot.queryParamMap.get('redirect_status');

    if (redirectStatus === 'succeeded') {
      this.status = 'success';
      this.message = 'Payment confirmed. Thank you!';
      return;
    }

    if (redirectStatus === 'processing') {
      this.status = 'processing';
      this.message = 'Payment processing. This can take a moment.';
      return;
    }

    if (redirectStatus === 'failed' || redirectStatus === 'requires_payment_method') {
      this.status = 'failed';
      this.message = 'Payment failed. Please try again.';
      return;
    }

    this.status = 'unknown';
    this.message = 'We could not confirm payment status.';
  }
}
