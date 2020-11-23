import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {AddressObj} from '../../models/address/AddressObj';
import set = Reflect.set;

declare var $: any;


@Injectable({
  providedIn: 'root'
})
export class FindAddressService {

  private urlDaDataINN: string = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
  private tokenDaData: string = 'a437178a69bc00fcb26cce29fca12824be0ae5af';

  constructor(private http: HttpClient) {
  }


  public requestCompanyBYINN(str: string) {
    const myHeaders = new HttpHeaders();
    myHeaders.set('Authorization', 'Token ' + this.tokenDaData)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    const params = new HttpParams()
      .set('query', str.toString())
      .set("type", "INDIVIDUAL");
    return this.http.post(this.urlDaDataINN, {params}, {headers: myHeaders});
  }


  public requestSearchRegion(str: string) {
    const params = new HttpParams()
      .set('query', str.toString())
      .set('contentType', 'region')
      .set('withParent', '3')
      .set('limit', '10');
    return this.http.get('https://kladr-api.ru/api.php', {params});
  }

  public requestSearchCity(str: string, selectedRegion: AddressObj) {
    console.log('City');
    const params = new HttpParams()
      .set('query', str.toString())
      .set('contentType', 'city')
      .set('regionId', selectedRegion.id.toString())
      .set('withParent', '1')
      .set('limit', '10');
    return this.http.get('https://kladr-api.ru/api.php', {params});
  }

  public requestSearchDistrict(str: string, selectedRegion: AddressObj) {
    console.log('DI');
    const params = new HttpParams()
      .set('query', str.toString())
      .set('contentType', 'district')
      .set('regionId', selectedRegion.id.toString())
      .set('withParent', '1')
      .set('limit', '5');
    return this.http.get('https://kladr-api.ru/api.php', {params});
  }

  public requestSearchStreet(str: string, selectedCity: AddressObj) {
    const params = new HttpParams()
      .set('query', str.toString())
      .set('contentType', 'street')
      .set('cityId', selectedCity.id.toString())
      .set('limit', '10');
    return this.http.get('https://kladr-api.ru/api.php', {params});
  }

  public requestSearchBuilding(str: string, selectedStreet: AddressObj) {
    console.log(selectedStreet);
    const params = new HttpParams()
      .set('query', str.toString())
      .set('contentType', 'building')
      .set('streetId', selectedStreet.id.toString())
      .set('limit', '10');
    return this.http.get('https://kladr-api.ru/api.php', {params});
  }


  public searchRegion(filed: FormControl, arrayResults?: Array<AddressObj>): Array<AddressObj> {
    console.log('B');
    filed.valueChanges.subscribe(value => {
      this.requestSearchRegion(value).subscribe(value1 => {
        this.fillArrayResult(value1, arrayResults);
      });

    });
    return arrayResults;
  }

  public searchCity(filed: FormControl, selectedRegion: AddressObj, arrayResults: Array<AddressObj>): Array<AddressObj> {

    filed.valueChanges.subscribe(value => {
      this.requestSearchCity(value, selectedRegion).subscribe(value1 => {
        this.fillArrayResult(value1, arrayResults);
      });

    });
    return arrayResults;
  }

  public searchDistrict(filed: FormControl, selectedRegion: AddressObj, arrayResults?: Array<AddressObj>): Array<AddressObj> {
    console.log('DD');
    filed.valueChanges.subscribe(value => {
      this.requestSearchDistrict(value, selectedRegion).subscribe(value1 => {
        this.fillArrayResult(value1, arrayResults);

      });

    });
    return arrayResults;
  }


  public searchStreet(filed: FormControl, selectedCity: AddressObj, arrayResults?: Array<AddressObj>): Array<AddressObj> {
    filed.valueChanges.subscribe(value => {
      this.requestSearchStreet(value, selectedCity).subscribe(value1 => {
        this.fillArrayResult(value1, arrayResults);
      });

    });
    return arrayResults;
  }

  public searchBuilding(filed: FormControl, selectedStreet: AddressObj, arrayResults?: Array<AddressObj>): Array<AddressObj> {

    filed.valueChanges.subscribe(value => {
      this.requestSearchBuilding(value, selectedStreet).subscribe(value1 => {
        this.fillArrayResult(value1, arrayResults);
        console.log(value1);
      });

    });
    return arrayResults;
  }

  private fillArrayResult(value: any, arrayResults?: Array<AddressObj>) {
    for (let i = 1, j = 0; i < value["result"].length; i++, j++) {
      arrayResults[j] = {
        'name': value['result'][i]['name'],
        'type': value['result'][i]['type'],
        'typeShort': value['result'][i]['typeShort'],
        'id': value['result'][i]['id'],

      };
      if (value['result'].length < 2) {
        arrayResults = new Array<AddressObj>();
      }
    }
  }


}
