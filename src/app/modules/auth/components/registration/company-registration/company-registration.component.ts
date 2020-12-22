import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {AddressObj} from '../../../../../models/address/AddressObj';
import {AddressCompany} from '../../../../../models/address/AddressCompany';
import {Observable} from 'rxjs';
import {FindAddressService} from '../../../../common-service/find-address.service';
import {RootSuggestion} from '../../../../../models/organisation/RootSuggestion';
import {Data} from '../../../../../models/organisation/Data';
import {OrganisationType} from '../../../../../models/type/OrganisationType';
import {UserType} from '../../../../../models/type/UserType';
import {ActivatedRoute, Router} from '@angular/router';
import {ProviderDto} from '../../../../../models/ProviderDto';
import {MatSnackBar} from '@angular/material/snack-bar';

declare var $: any;
const urlDaDataINN: string = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party';
const tokenDaData: string = 'a437178a69bc00fcb26cce29fca12824be0ae5af';




@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyRegistrationComponent implements OnInit {
  hide = true;

  regCompanyForm: FormGroup;
  nameCompany: FormControl;
  countryCompany: FormControl;
  cityCompany: FormControl;
  streetCompany: FormControl;
  buildingCompany: FormControl;
  regionCompany: FormControl;
  districtCompany: FormControl;
  passwordCompany: FormControl;
  passwordConfirmCompany: FormControl;

  OrganisationType = OrganisationType;

  private _resAddress: AddressCompany;

  filteredOptions: Observable<AddressObj[]>;
  public fiasObjects: Array<AddressObj> = new Array<AddressObj>();
  innArr: Data[];

  constructor(private authService: AuthService, private findAddressService: FindAddressService, private router: Router, private _snackBar: MatSnackBar,
  private _route: ActivatedRoute) {
    this.resAddress = new AddressCompany();
  }


  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.Jquery();

    this.findAddressService.searchRegion(this.regionCompany, this.fiasObjects);

    this.nameCompany.valueChanges.subscribe(value => {
      this.requestCompanyBYINN(value);
    })

    this.regCompanyForm.valueChanges.subscribe(value => {
      console.log(value);
    })

  }

  public requestCompanyBYINN(query: string) {

    let d = query
    console.log(d)
    // @ts-ignore
    if (query.name !== undefined) {
      // @ts-ignore
       d = query.name?.full;
    }
    console.log(d)
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + tokenDaData
      },
      body: JSON.stringify({
        query: d,
        count: 10
      })
    }
let res = new RootSuggestion();

    // @ts-ignore
    fetch(urlDaDataINN, options)
      .then(response => response.text())
      .then(result => {
        this.innArr = [];
        res = JSON.parse(result)
        for (let i = 0; i < res.suggestions.length; i++) {
          this.innArr.push(res.suggestions[i].data)
        }
        console.log(this.innArr)
      })
      .catch(error => console.log("error", error));
  }


  createFormControls() {
    this.nameCompany = new FormControl('', [Validators.required, Validators.maxLength(30)]);
    this.cityCompany = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.countryCompany = new FormControl('Россия', [Validators.required, Validators.maxLength(20)]);
    this.streetCompany = new FormControl('', [Validators.required, Validators.maxLength(15)]);
    this.buildingCompany = new FormControl('', [Validators.required, Validators.maxLength(10)]);
    this.regionCompany = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.districtCompany = new FormControl('', [Validators.maxLength(15)]);
    this.passwordCompany = new FormControl('', );
    this.passwordConfirmCompany = new FormControl('', );

  }

  createForm() {
    this.regCompanyForm = new FormGroup({
      nameCompany: this.nameCompany,
      countryCompany: this.countryCompany,
      cityCompany: this.cityCompany,
      streetCompany: this.streetCompany,
      buildingCompany: this.buildingCompany,
      regionCompany: this.regionCompany,
      districtCompany: this.districtCompany,
      passwordCompany: this.passwordCompany,
      passwordConfirmCompany: this.passwordConfirmCompany

    });

  }


  displayFn(obj: AddressObj): string {
    return obj && obj.name ? obj.name : '';
  }

  private Jquery() {
    $.fias.token = '5Kaya85thDHibsYt2frbZzNQ6kh2StNN';
    $.fias.url = 'https://kladr-api.ru/api.php';


  }

  selectRegion(addressObj: AddressObj) {
    this.resAddress.region = addressObj;
    this.findAddressService.searchDistrict(this.districtCompany, this.resAddress.region, this.fiasObjects);
    this.findAddressService.searchCity(this.cityCompany, this.resAddress.region, this.fiasObjects);
    console.log(this.resAddress);
    this.clearOldData();
  }

  public selectStreet(addressObj: AddressObj) {
    this.resAddress.street = addressObj;
    this.findAddressService.searchBuilding(this.buildingCompany, this.resAddress.street, this.fiasObjects);
    console.log(this.resAddress);

  }


  public selectLocality(addressObj: AddressObj) {
    this.resAddress.city = addressObj;
    this.findAddressService.searchStreet(this.streetCompany, this.resAddress.city, this.fiasObjects);
    console.log(this.resAddress);
    this.clearOldData();
  }

  public selectBuilding(addressObj: AddressObj) {
    this.resAddress.building = addressObj;

    console.log(this.resAddress);
  }

  public selectDistrict(addressObj: AddressObj) {
    this.resAddress.district = addressObj;

    console.log(this.resAddress);
  }


  get resAddress(): AddressCompany {
    return this._resAddress;
  }

  set resAddress(value: AddressCompany) {
    this._resAddress = value;
  }


  submit() {
    this.checkForm();
    let company = new ProviderDto();
    console.log(this.nameCompany.value)
    company.name = this.nameCompany.value.name.full;
    company.password = this.passwordCompany.value;
    company.address = this.resAddress;
    this.authService.saveCompany(company).subscribe(value => {

      this.router.navigate(["/login"])
    },
      error => {
this.openSnackBar(error.error.message, "Закрыть")
      })

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  private checkForm() {
    if (this.resAddress.region.name == '') {
      let obj = new AddressObj();
      obj.name = this.regionCompany.value;
      this.resAddress.region = obj;
    }
    if (this.resAddress.district.name == '') {
      let obj = new AddressObj();
      obj.name = this.districtCompany.value;
      this.resAddress.district = obj;
    }
    if (this.resAddress.city.name == '') {
      let obj = new AddressObj();
      obj.name = this.cityCompany.value;
      this.resAddress.city = obj;
    }
    if (this.resAddress.street.name == '') {
      let obj = new AddressObj();
      obj.name = this.streetCompany.value;
      this.resAddress.street = obj;
    }
    if (this.resAddress.building.name == '') {
      let obj = new AddressObj();
      obj.name = this.buildingCompany.value;
      this.resAddress.building = obj;
    }
  }

  clearOldData() {
    this.fiasObjects.forEach(value => {
      this.fiasObjects.shift();
    });
  }

  selectCountry() {
    for (let i in this.regCompanyForm.controls) {
      if (i !== 'nameCompany') {
        this.regCompanyForm.controls[i].setValue('');
        this.regCompanyForm.controls[i].markAsUntouched();
        console.log(this.regCompanyForm.controls[i]);
      }

    }
    this.resAddress = new AddressCompany();
  }

  public getErrorMessageRequired(nameFiled: string): string {
    return 'Заполните поле ' + nameFiled;
  }

  public getErrorMessageEmail(): string {
    return 'Не правильный email.';
  }


  public getErrorMessageMaxLength(nameFiled: string, amount: number): string {
    return 'Символов в поле ' + nameFiled + ' должно быть не более ' + amount + ' символов.';
  }

  public getErrorMessageMax(nameFiled: string, amount: number): string {
    return 'Число в поле ' + nameFiled + ' должно быть не более ' + amount;
  }

  public getErrorMessageMin(nameFiled: string, amount: number): string {
    return 'Число в поле ' + nameFiled + ' должно быть не менее ' + amount;

  }

  displayFn2(obj: Data): string {
    return obj.name && obj.name.short ? obj.name.short : '';
  }



}
