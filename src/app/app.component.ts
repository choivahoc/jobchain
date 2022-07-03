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
      this.isLoading = false;
      this.displayedColumns = ['tx_hash', 'blockId', 'method', 'mintdata'];
    });
  }

  searchDetailTransaction(): void {

    let id = this.searchWord;

    this.contractService.getDetailTransactions(id).subscribe((value) => {
      this.dataSource = [value.data];
      this.isLoading = false;
      this.displayedColumns = ['tx_hash', 'blockId', 'method', 'mintdata'];
    });

  }
}
