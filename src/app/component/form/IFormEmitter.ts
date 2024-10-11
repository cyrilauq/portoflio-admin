import { EventEmitter } from "@angular/core";

export default interface IFormEmitter<T> {
    formSubmitted: EventEmitter<T>
}