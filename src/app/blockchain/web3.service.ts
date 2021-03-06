import { Injectable, NgZone } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { Observable } from 'rxjs';

const contractAbi = require('./contractABI.json');
declare var window: any;
@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3: Web3;
  private contract: Contract;
  private contractAddress = '0x5508d0d462e4E35c075cdEc9094B35923687343f';

  constructor(private zone: NgZone) {
    if (window.web3) {
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(
        contractAbi,
        this.contractAddress
      );
      window.ethereum.enable().catch((err) => console.log(err));
    } else {
      console.warn('installer metamsk.');
      var r = confirm('Veuillez Installer MetaMask Press Ok pour telecharger!');
      while (!r) {
        r = confirm(
          "L'installation de Metamask est necessaire pour la poursuite \n \t \t \t Appuyez ok pour telecharger !"
        );
      }
      location.href = 'https://metamask.io/download.html';
    }
  }

  getAccount(): Promise<string> {
    return this.web3.eth.getAccounts().then((accounts) => accounts[0] || '');
  }

  async executeTransaction(fnName: string, ...args: any[]): Promise<void> {
    const acc = await this.getAccount();
    this.contract.methods[fnName](...args).send({ from: acc });
  }

  async call(fnName: string, ...args: any[]) {
    const acc = await this.getAccount();
    return this.contract.methods[fnName](...args).call({ from: acc });
  }

  onEvents(event: string) {
    return new Observable((observer) => {
      this.contract.events[event]().on('data', (data) => {
        this.zone.run(() => {
          observer.next({
            event: data.event,
            payload: data.returnValues,
          });
        });
      });
    });
  }
}
