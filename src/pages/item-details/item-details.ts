import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MissionDetailInterface } from '../list/list';
import { MissionListServiceProvider } from '../../providers/mission-list-service/mission-list-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})

/**
 * Class Managing the Details page view.
 */
export class ItemDetailsPage {

  selectedItem: MissionDetailInterface;

  itemId: number;

  isError: boolean;

  /**
   * @constructor
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {MissionListServiceProvider} missionListService - Service to help retireve missions by id
   * @param {LoadingServiceProvider} loadingService - Displays and hides loading screen
   */
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public missionListService: MissionListServiceProvider, public loadingService: LoadingServiceProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.itemId = navParams.get('id');
    // Flag to determine if the id of the page is valid
    this.isError = false;
  }


  /**
   * Invoked when the view is fully loaded.
   * Initiates an API request to load the mission by Id.
   * API request will be fired only if the user reaching this page directly by typing URL
   */
  ionViewDidLoad() {
    if(!this.selectedItem) {
      this.getMissionById(this.itemId);
    }
  }


  /**
   * Gets the mission by id
   * @param {number} id - Id to which the mission is to be retrieved
   */
  getMissionById(id:number) {
    this.loadingService.showLoading();

    this.missionListService.getMissionById(id)
      .then(item => this.selectedItem = item)
      .catch((err) => {
        this.isError = true;
        // Should be logged to the logging service ideally
        console.error('Error from API ', err);
      });

    this.loadingService.dismissLoading();
  }
}
