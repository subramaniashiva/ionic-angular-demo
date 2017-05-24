import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MissionListServiceProvider } from '../../providers/mission-list-service/mission-list-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';

import { ItemDetailsPage } from '../item-details/item-details';

/**
 * Interface for mission detail.
 * Represents the contents within a misson object.
 * @param {string} name - Name of the mission.
 * @param {string} gender - Gender of the person involved in mission.
 * @param {string} birth_year - Birth Year of the person involved in mission.
 * @param {string} icon - Icon to be shown for the mission.
 */
export interface MissionDetailInterface {
  name: string,
  gender: string,
  birth_year: string,
  icon: string,
  url: string
};

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
/**
 * Class Managing the Missions List Page of the application.
 */
export class ListPage {

  // Icons used to show against each character.
  icons: string[];

  // Next page number to be fetched.
  nextPageNumber: number;

  // List of Mission Items.
  items: Array<MissionDetailInterface>;

  /**
   * @constructor
   * @param {MissionListServiceProvider} missionListService - Service to retireive missions
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {LoadingServiceProvider} loadingService
   */
  constructor(public missionListService: MissionListServiceProvider, public navCtrl: NavController,
    public navParams: NavParams, public loadingService: LoadingServiceProvider) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    this.nextPageNumber = 0;
  }


  /**
   * Invoked when a mission is clicked.
   * Pushes item detail view to the top of the view stack.
   * @param {object} event - The click event happened.
   * @param {object} item - The actual item clicked.
   */
  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item,
      id: this.getItemId(item)
    });
  }


  /**
   * Invoked when the view is fully loaded.
   * Initiates an API request to load the missions.
   */
  ionViewDidLoad() {
    this.getMissions();
  }


  /**
   * Returns the next page number to be fetched.
   * If no url or invalid url is provided returns a number.
   * @param {string} url - The next url got from the previous response.
   * @return {number}
   */
  getNextPageNumber(url:string):number {
    return (!url || url.split('=').length !== 2)? 0 : Number(url.split('=').pop());
  }


  /**
   * Gets the missions from API and populates the item array.
   * This item array will be used by the UI to populate the list.
   * @param {number} pageNumber - Page number of missions to be fetched.
   */
  getMissions(pageNumber?:number) {
    this.loadingService.showLoading();

    this.missionListService.getMissions(pageNumber).then(res => {
      this.nextPageNumber = Number(this.getNextPageNumber(res.next));
      res.results && res.results.map((item) => {
        item.icon = this.icons[Math.floor(Math.random() * this.icons.length)];
        this.items.push(item);
      });
    }).catch((err) => {
      // Should be logged to the logging service ideally
      console.error('Error from API ', err);
    });

    this.loadingService.dismissLoading();
  }


  /**
   * Loads the next set of missions.
   */
  loadMore() {
    this.getMissions(this.nextPageNumber);
  }

  /**
   * Get item id from a give item
   * @param {MissionDetailInterface} - item. Object of type mission
   */
  getItemId(item:MissionDetailInterface):number {
    return Number(item.url.split('/').slice(-2, -1)[0]);
  }

}
