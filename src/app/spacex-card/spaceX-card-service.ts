import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Constants } from '../constants';
import { isUndefined } from 'util';
@Injectable()
export class SpaceXCardSevice {
    constructor(private http: HttpClient) { }
    url = Constants.BASE_URL;
    paramFormat = {
        launchYear: 'launch_year',
        launchSuccess: 'launch_success',
        landSuccess: 'land_success'
    };
    getSpaceXData(parameters) {
        let param = new HttpParams();
        if (!isUndefined(parameters)) {
            param = isUndefined(parameters[this.paramFormat.launchYear]) ?
                param : param.append(this.paramFormat.launchYear, parameters[this.paramFormat.launchYear]);
            param = isUndefined(parameters[this.paramFormat.launchSuccess]) ?
                param : param.append(this.paramFormat.launchSuccess, parameters[this.paramFormat.launchSuccess]);
            param = isUndefined(parameters[this.paramFormat.landSuccess]) ?
                param : param.append(this.paramFormat.landSuccess, parameters[this.paramFormat.landSuccess]);
        }
        // console.log("params :: ", params);
        return this.http.get(this.url, { params: param })
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            /*custom lint rules will break the build if console found in the code.
                        Instead use alert if any error found*/
            // console.error('An error occurred:', error.error.message);
            alert(`An error occurred:, ${error.error.message}`);
        } else {
            //     console.error(
            //         `Backend returned code ${error.status}, ` +
            //         `body was: ${error.error}`);
            // }
            alert(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);

            return throwError(
                'Something bad happened; please try again later.');
        }
    }
}
