import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {GetCity} from '../../../../models/GetCity';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

declare var $: any;
@Component({
  selector: 'app-company-registation',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyRegistrationComponent implements OnInit {


  regCompanyForm: FormGroup;
  nameCompany: FormControl;
  countryCompany: FormControl;
  cityCompany: FormControl;
  filteredOptions: Observable<GetCity[]>;
  public cities: Array<GetCity> = new Array<GetCity>();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.Jquery();
    this.cityCompany.valueChanges.subscribe(value => {
      this.authService.searchCity(value).subscribe(value1 => {
        for (let i = 1, j = 0;  i < value1["result"].length; i++, j++) {
          this.cities[j] = {
            "city": value1["result"][i]["name"],
            "typeCity": value1["result"][i]["type"],
            "parents": value1["result"][i]["parents"],
            "typeShort": value1["result"][i]["typeShort"]

          };
          console.log( value1["result"]);
          console.log( this.cities);
        }


      });

    })

    // this.filteredOptions = this.cityCompany.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : value.name),
    //     map(name => name ? this._filter(name) : this.cities.slice())
    //   );
  }

  createFormControls() {
    this.nameCompany = new FormControl('', Validators.required);
    this.cityCompany = new FormControl('', Validators.required);
    this.countryCompany = new FormControl('', [
      Validators.required
    ]);

  }

  createForm() {
    this.regCompanyForm = new FormGroup({
      nameCompany: this.nameCompany,
      countryCompany: this.countryCompany,
      cityCompany: this.cityCompany

    });

  }
  public serch(obj: any) {


  }

  displayFn(city: GetCity): string {
    return city && city.city ? city.city : '';
  }

  private _filter(name: string): GetCity[] {
    const filterValue = name.toLowerCase();

    return this.cities.filter(option => option.city.toLowerCase().indexOf(filterValue) === 0);
  }

  private Jquery() {
    $.fias.token = '5Kaya85thDHibsYt2frbZzNQ6kh2StNN';
    $.fias.url = 'https://kladr-api.ru/api.php';
  }
}
