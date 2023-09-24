import {  Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
 
  title = 'vj';
  dataSource = [];
  loopCount: number[] = [1];
  displayedColumns: string[] = ['S.No', 'Item Name', 'Pc\'s','Gr.Wt','Dr.Wt','P.Wt','Stn.Wt','Net.Wt','Purity','Wastage %','Fine Wt','Rate','Labour','Amount'];
  displayedColumns2: string[] = ['Pc\'s','Gr.Wt','Dr.Wt','P.Wt','Stn.Wt','Net.Wt','Purity','Wastage','Fine Wt','Rate','Labour','Amount'];
  dropWtTotal: number = 0;
  totalLabourAmt : number = 0;
  totalStoneWt: number =0;
  totalPulseWt: number =0;
  totalAmt: number = 0;
  currentDate: Date = new Date();
 
  add(){
    this.loopCount[this.loopCount.length] = this.loopCount[this.loopCount.length-1]+1;
   
  }
  setValue(i:number,j:number){
    if(j==0){
      (<HTMLInputElement>document.getElementById(this.displayedColumns[0]+i)).value = (this.loopCount[i]).toString();
    }
    return '';
  }
  delete(){
    this.loopCount.splice(-1)
  }
  print(){
    const printContent = document.getElementById("vj");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=1000,height=1000,toolbar=0,scrollbars=0,status=0');
    WindowPrt?.document.write(printContent?.innerHTML ? printContent?.innerHTML : '');
    WindowPrt?.document.close();
    WindowPrt?.focus();
    WindowPrt?.print();
    WindowPrt?.close();
  }
  focusout(i:number,j:number){
    if(j == 3 || j == 4 || j == 5 || j == 6){
      const gross = (<HTMLInputElement>document.getElementById(this.displayedColumns[3]+i))?.value;
      const drop = (<HTMLInputElement>document.getElementById(this.displayedColumns[4]+i))?.value;
      const pulse = (<HTMLInputElement>document.getElementById(this.displayedColumns[5]+i))?.value;
      const stone = (<HTMLInputElement>document.getElementById(this.displayedColumns[6]+i))?.value
      if(gross && (drop || pulse || stone)){
        (<HTMLInputElement>document.getElementById(this.displayedColumns[7]+i)).value = ((Number(gross) - (Number(drop) + Number(pulse) + Number(stone))).toFixed(3)).toString();
      }
      if(j == 4) this.getDropWtTotal()
      else if(j == 5) this.getPulseWtTotal();
      else if(j==6) this.getStoneWtTotal();
    }
    else if(j == 7 || j == 9){
      const net = (<HTMLInputElement>document.getElementById(this.displayedColumns[7]+i))?.value;
      const waste = (<HTMLInputElement>document.getElementById(this.displayedColumns[9]+i))?.value;
      if(net && waste){
        (<HTMLInputElement>document.getElementById(this.displayedColumns[10]+i)).value = ((Number(net) + ((Number(waste)*Number(net))/100)).toFixed(3)).toString();
      } else {
        (<HTMLInputElement>document.getElementById(this.displayedColumns[10]+i)).value = (Number(net)).toFixed(3).toString();
      }
    }
    else if(j == 10 || j == 11 || j == 12){
      const gross = (<HTMLInputElement>document.getElementById(this.displayedColumns[3]+i))?.value;
      const fine = (<HTMLInputElement>document.getElementById(this.displayedColumns[10]+i))?.value;
      const gold = (<HTMLInputElement>document.getElementById(this.displayedColumns[11]+i))?.value;
      const labour = (<HTMLInputElement>document.getElementById(this.displayedColumns[12]+i))?.value;
      const drop = (<HTMLInputElement>document.getElementById(this.displayedColumns[4]+i))?.value;
      const pulse = (<HTMLInputElement>document.getElementById(this.displayedColumns[5]+i))?.value;
      const stone = (<HTMLInputElement>document.getElementById(this.displayedColumns[6]+i))?.value;
      const dropCost = (<HTMLInputElement>document.getElementById(this.displayedColumns[4]+i+'value'))?.value;
      const pulseCost = (<HTMLInputElement>document.getElementById(this.displayedColumns[5]+i+'value'))?.value;
      const stoneCost = (<HTMLInputElement>document.getElementById(this.displayedColumns[6]+i+'value'))?.value;
      if(fine && gold && labour){
        let addDrop = 0;
        if(drop && dropCost){
          addDrop = Number(drop) * 5 * Number(dropCost);
        }
        let addPulse = 0;
        if(pulse && pulseCost){
          addPulse = Number(pulse) * 5 * Number(pulseCost);
        }
        let addStone = 0;
        if(stone && stoneCost){
          addStone = Number(stone) * 5 * Number(stoneCost);
        }
        (<HTMLInputElement>document.getElementById(this.displayedColumns[13]+i)).value = ((Number(fine) * Number(gold) + Number(gross) * Number(labour) + addDrop + addPulse + addStone).toFixed(3)).toString();
        if(j==12) this.getLabourAmt();
      }
    }
  }
  getPieces(){
    let value = 0;
    this.loopCount.forEach((x:any,i:number)=>{
        if(document.getElementById(this.displayedColumns[2]+i)){
          value = value + Number((<HTMLInputElement>document.getElementById(this.displayedColumns[2]+i)).value);
        }
    })
    return value;
  }
  getGrossWt() {
    let value = 0;
    this.loopCount.forEach((x:any,i:number)=>{
        if(document.getElementById(this.displayedColumns[2]+i)){
          value = value + Number((<HTMLInputElement>document.getElementById(this.displayedColumns[3]+i)).value);
        }
    })
    return value;
  }
  getDropWt() {
    let value = 0;
    this.loopCount.forEach((x:any,i:number)=>{
        if(document.getElementById(this.displayedColumns[2]+i)){
          value = value + Number((<HTMLInputElement>document.getElementById(this.displayedColumns[4]+i)).value);
        }
    })
    return value;
  }
  getPulseWt() {
    let value = 0;
    this.loopCount.forEach((x:any,i:number)=>{
        if(document.getElementById(this.displayedColumns[2]+i)){
          value = value + Number((<HTMLInputElement>document.getElementById(this.displayedColumns[5]+i)).value);
        }
    })
    return value;
  }
  getStoneWt() {
    let value = 0;
    this.loopCount.forEach((x:any,i:number)=>{
        if(document.getElementById(this.displayedColumns[2]+i)){
          value = value + Number((<HTMLInputElement>document.getElementById(this.displayedColumns[6]+i)).value);
        }
    })
    return value;
  }
  getNetWt() {
    let value = 0;
    this.loopCount.forEach((x:any,i:number)=>{
        if(document.getElementById(this.displayedColumns[2]+i)){
          value = value + Number((<HTMLInputElement>document.getElementById(this.displayedColumns[7]+i)).value);
        }
    })
    return value;
  }
  getFineWt() {
    let value = 0;
    this.loopCount.forEach((x:any,i:number)=>{
        if(document.getElementById(this.displayedColumns[2]+i)){
          value = value + Number((<HTMLInputElement>document.getElementById(this.displayedColumns[10]+i)).value);
        }
    })
    return value;
  }
  getTotalAmt() {
    let value = 0;
    this.loopCount.forEach((x:any,i:number)=>{
        if(document.getElementById(this.displayedColumns[2]+i)){
          value = value + Number((<HTMLInputElement>document.getElementById(this.displayedColumns[13]+i)).value);
        }
    })
    this.totalAmt =  value;
  }
  getDropWtTotal(){
    let value = 0;
    this.loopCount.forEach((x:any,i:number)=>{
      const dropCost = (<HTMLInputElement>document.getElementById(this.displayedColumns[4]+i+'value'))?.value;
      const drop = (<HTMLInputElement>document.getElementById(this.displayedColumns[4]+i))?.value;
      if(drop && dropCost)
        value = value + Number(drop) * 5 * Number(dropCost);
    });
    this.dropWtTotal = value;
  }
  getPulseWtTotal(){
    let value = 0;
    this.loopCount.forEach((x:any,i:number)=>{
      const dropCost = (<HTMLInputElement>document.getElementById(this.displayedColumns[5]+i+'value'))?.value;
      const drop = (<HTMLInputElement>document.getElementById(this.displayedColumns[5]+i))?.value;
      if(drop && dropCost)
      value = value + Number(drop) * 5 * Number(dropCost);
    });
    this.totalPulseWt = value;
  }
  getStoneWtTotal(){
    let value = 0;
    this.loopCount.forEach((x:any,i:number)=>{
      const dropCost = (<HTMLInputElement>document.getElementById(this.displayedColumns[6]+i+'value'))?.value;
      const drop = (<HTMLInputElement>document.getElementById(this.displayedColumns[6]+i))?.value;
      if(drop && dropCost)
      value = value + Number(drop) * 5 * Number(dropCost);
    });
    this.totalStoneWt = value;
  }
  getLabourAmt() {
    let value = 0;
    this.loopCount.forEach((x:any,i:number)=>{
      const gross = (<HTMLInputElement>document.getElementById(this.displayedColumns[3]+i))?.value;
      const labour = (<HTMLInputElement>document.getElementById(this.displayedColumns[12]+i))?.value;
      if(gross && labour)
      value = value + Number(gross) * Number(labour)
    });
    this.totalLabourAmt =  value;
  }
 
}
