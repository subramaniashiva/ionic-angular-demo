import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MissionListServiceProvider } from '../../providers/mission-list-service/mission-list-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';

import { MissionDetailsPage } from '../mission-details/mission-details';

/**
 * @interface - Interface for mission detail. Represents the contents within a misson object.
 * @param {string} name - Name of the mission.
 * @param {string} gender - Gender of the person involved in mission.
 * @param {string} birth_year - Birth Year of the person involved in mission.
 * @param {string} image_small - Url for the small image.
 * @param {string} image_big - Url for the big image.
 * @param {string} url - Unique Url for the mission.
 * @param {string} eye_color - Eye color of the character.
 * @param {string} hair_color - Hair color of the character.
 * @param {string} skin_color - Skin color of the character.
 * @param {string} height - Height of the character.
 * @param {string} mass - Mass of the character.
 * @param {string} homeworld - Homeworld API link.
 */
export interface MissionDetailInterface {
  name: string,
  gender: string,
  birth_year: string,
  image_small: string,
  image_big: string,
  url: string,
  eye_color: string,
  hair_color: string,
  skin_color: string,
  height: string,
  mass: string,
  homeworld: string
};

// Path for temporary images to be loaded with cards.
export const ImageHelper = {
  imagePath: 'assets/images/mission-list/',
  getRandomImageNumber: function():number {
    return (Math.floor(Math.random() * 5) + 1);
  }
};


@Component({
  selector: 'page-mission-list',
  templateUrl: 'mission-list.html'
})
/**
 * Class Managing the Missions List Page of the application.
 */
export class MissionListPage {

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
  constructor(public missionListService: MissionListServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingService: LoadingServiceProvider) {

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
    this.navCtrl.push(MissionDetailsPage, {
      item: item,
      id: this.getMissionId(item)
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

    this.missionListService.getMissions(pageNumber)
    .then(res => {
      this.nextPageNumber = Number(this.getNextPageNumber(res.next));
      res.results && res.results.map((item) => {
        let imageRandNumber = ImageHelper.getRandomImageNumber();
        item.image_small = ImageHelper.imagePath + imageRandNumber.toString() + '-small.png';
        item.image_big = ImageHelper.imagePath + imageRandNumber.toString() + '-big.png';
        this.items.push(item);
      });
      return this.items;
    })
    .catch(this.handleError)
    .then(() => {
      this.loadingService.dismissLoading();
    });
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
  getMissionId(item:MissionDetailInterface):number {
    if(!item.url) {
      return 1;
    } else {
      return Number(item.url.split('/').slice(-2, -1)[0]);
    }
  }

  /**
   * Handles Errors from API calls.
   * Ideally should log to the error service. Logging to console temporarily.
   * @param {object} - err. Error object;
   */
  private handleError(err): Promise<any> {
    return Promise.reject(err.message || err);
  }

}
