import { api, LightningElement } from 'lwc';
import { getSObjectValue } from '@salesforce/apex';

import BOAT_FIELD_NAME from '@salesforce/schema/Boat__c.Name'
import BOAT_FIELD_OWNER from '@salesforce/schema/Boat__c.Contact__r.Name'
import BOAT_FIELD_PRICE from '@salesforce/schema/Boat__c.Price__c'
import BOAT_FIELD_LENGHT from '@salesforce/schema/Boat__c.Length__c'
import BOAT_FIELD_BOAT_TYPE_NAME from '@salesforce/schema/Boat__c.BoatType__r.Name'
const TILE_WRAPPER_SELECTED_CLASS = 'tile-wrapper selected'
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper'

export default class BoatTile extends LightningElement {
    @api boat;
    @api selectedBoatId;

    // Getter for dynamically setting the background image for the picture
    get backgroundStyle() {
        return 'background-image:url(' + this.boat.Picture__c + ')';
    }

    // Getter for dynamically setting the tile class based on whether the
    // current boat is selected
    get tileClass() {
        if (this.selectedBoatId == this.boat.Id)
            return TILE_WRAPPER_SELECTED_CLASS
        else
            return TILE_WRAPPER_UNSELECTED_CLASS
    }

    get name() {
        return this.boat ? getSObjectValue(this.boat, BOAT_FIELD_NAME) : '';
    }

    get owner() {
        return this.boat ? getSObjectValue(this.boat, BOAT_FIELD_OWNER) : '';
    }

    get price() {
        return this.boat ? getSObjectValue(this.boat, BOAT_FIELD_PRICE) : '';
    }

    get length() {
        return this.boat ? getSObjectValue(this.boat, BOAT_FIELD_LENGHT) : '';
    }

    get type() {
        return this.boat ? getSObjectValue(this.boat, BOAT_FIELD_BOAT_TYPE_NAME) : '';
    }

    // Fires event with the Id of the boat that has been selected.
    selectBoat() {
        const boatSelect = new CustomEvent('boatselect', { detail: { boatId: this.boat.Id } });
        this.dispatchEvent(boatSelect);
    }
}