import { Injectable, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";


@Injectable({
    providedIn: 'any'
})
export class SubscriberComponent implements OnDestroy{
    protected subscription: Subscription = new Subscription();
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}