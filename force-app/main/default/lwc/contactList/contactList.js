import { LightningElement, wire } from 'lwc';

import { getObjectInfo } from "lightning/uiObjectInfoApi";

import CONTACT_OBJECT from '@salesforce/schema/Contact';

import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

import getContacts from '@salesforce/apex/ContactController.getContacts';

import { reduceErrors } from 'c/ldsUtils';

const COLUMNS = [
    { label: FIRST_NAME_FIELD.fieldLabel, fieldName: FIRST_NAME_FIELD.fieldApiName, type: 'text' },
    { label: LAST_NAME_FIELD.fieldLabel, fieldName: LAST_NAME_FIELD.fieldApiName, type: 'text' },
    { label: EMAIL_FIELD.fieldLabel, fieldName: EMAIL_FIELD.fieldApiName, type: 'email' }
];

export default class AccountList extends LightningElement {
    @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT })
    objectInfo;

    columns = COLUMNS;

    @wire(getContacts)
    contacts;

    get errors() {
        return (this.contacts.error) ?
            reduceErrors(this.contacts.error) : [];
    }
}