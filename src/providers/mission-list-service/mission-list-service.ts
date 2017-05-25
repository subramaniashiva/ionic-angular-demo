import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// Import API.
import API from '../../utils/api';

// Messages used by the MissionListServiceProvider.
const messages = {
  invalidCreds: 'Invalid Credentials',
  emailPassWrong: 'Email or Password is wrong',
  errOccured: 'An error occured'
};

/**
 * Class Used to getch Mission List.
 */
@Injectable()
export class MissionListServiceProvider {

  /**
   * Used to get mission list.
   * If no page number is provided, gets the first page from list of missions api.
   * If page number is provided, gets the list of missions from the page number specified.
   * @param {number} pageNumber - Page Number of missions list to be retireved.
   * @return {Promise} Promise which resolves to an array of mission objects
   */
  public getMissions(pageNumber?:number): Promise<any> {
    let url = API.root + API.path.missionList;
    if(pageNumber) {
      url = API.root + API.path.missionListPage + pageNumber.toString();
    }
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  /**
   * Used to get mission by id.
   * @param {number} id - Id of the mission to be retreived.
   * @return {Promise} Promise which resolves to a mission object
   */
  public getMissionById(id:number): Promise<any> {
    if(id) {
      return this.http.get(API.root + API.path.missionById + id.toString())
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

  }

  /**
   * Used to get planet details by id.
   * @param {number} id - Id of the planet to be retreived.
   * @return {Promise} Promise which resolves to a planet object
   */
  public getPlanetById(id:number): Promise<any> {
    if(id) {
      return this.http.get(API.root + API.path.planetById + id.toString())
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }
  }

  /**
   * Used to handle error from the login API request.
   * Logs the error in console.
   * Ideally the error should be pushed to third party log service.
   * @param {Any} error - Error object.
   * @return {Promise} A rejected Promise.
   */
  private handleError(error: any): Promise<any> {
    console.error(messages.errOccured, error);
    return Promise.reject(error.message || error);
  }


  /**
   * @constructor
   * @param {Http} http - http module from angular.
   */
  constructor(public http: Http) {}

}
