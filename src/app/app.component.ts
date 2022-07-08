import { Component, OnInit } from '@angular/core';
import { ContractService } from './services/contract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'jobchains';
  searchWord: string | undefined;
  dataSource: any;

  displayedColumns: string[] = ['tx_hash', 'blockId', 'method', 'mintdata'];

  types = [
    {
      key: 'contract',
      name: 'Contract'
    },
    {
      key: 'transactions',
      name: 'Transactions'
    }
  ];
  typeSearch = 'contract';
  keyTypeSearch = {
    Transactions: 'transactions',
    Contract: 'contract'
  }
  isLoading = false;
  // aura1eq9uvjm5l9p3a8qwv9z0asxy494wu0uy7mrcw9vjke0p0a2ml8aqjqqxz4

  constructor(private contractService: ContractService) {
  }


  ngOnInit(): void {


  }

  searchInfo() {
    if (!this.searchWord) return;
    this.isLoading = true;

    if (this.typeSearch === this.keyTypeSearch.Contract){
      this.searchAllTransaction();
    } else {
      this.searchDetailTransaction();
    }

  }

  searchAllTransaction(): void{
    let body =
      {
        "limit": 25,
        "offset": 0,
        "label": "",
        "contract_address": this.searchWord
      };

    this.contractService.getInfoTransactions(body).subscribe((value) => {
      this.dataSource = value.data;
      console.log(this.dataSource);
      this.isLoading = false;
      this.displayedColumns = ['tx_hash', 'user_id', 'full_name', 'date_of_birth', 'province','school_name',
        'department_name', 'major','academic_ability', 'awarded_date'];

    });
  }

  searchDetailTransaction(): void {

    let id = this.searchWord;

    this.contractService.getDetailTransactions(id).subscribe((value) => {
      this.dataSource = [value.data];
      this.isLoading = false;
      this.displayedColumns = ['tx_hash', 'user_id', 'full_name', 'date_of_birth', 'province','school_name',
        'department_name', 'major','academic_ability', 'awarded_date'];
    });
  }

  getMintData(element: any): any {
    return element?.messages[0].msg?.mint?.extension;
  }

  getDiplomaInfo(element: any): any {
    return this.getMintData(element)?.diplomas;
  }

  getGraduateInfo(element: any): any {
    return this.getDiplomaInfo(element)?.graduate_info?.length > 0
      ? this.getDiplomaInfo(element)?.graduate_info[0] : this.getDiplomaInfo(element)?.graduate_info;
  }

  getSchoolInfo(element: any): any {
    console.log(this.getGraduateInfo(element)?.school);
    return this.getGraduateInfo(element)?.school;
  }

  getDepartmentInfo(element: any): any {
    return this.getSchoolInfo(element)?.department;
  }

  getMajorInfo(element: any): any {
    return this.getDepartmentInfo(element)?.major;
  }


  getUserInfo(element:any): any {
    return this.getGraduateInfo(element)?.vi ? this.getGraduateInfo(element).vi.user : this.getGraduateInfo(element)?.user;
  }





}
