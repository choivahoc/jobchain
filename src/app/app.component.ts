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

  displayedColumns: string[] = ['tx_hash', 'blockId', 'method'];


  constructor(private contractService: ContractService) {
  }


  ngOnInit(): void {
    

  }

  searchInfo() {
    let body = 
    {
      "limit": 25,
      "offset": 0,
      "label": "",
      "contract_address": this.searchWord
    };

    this.contractService.getInfoTransactions(body).subscribe((value) => {

      console.log(value);
      
      this.dataSource = value.data;
    });
  }

// aura1eq9uvjm5l9p3a8qwv9z0asxy494wu0uy7mrcw9vjke0p0a2ml8aqjqqxz4





}
