import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShowService} from "./show.service";
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})

export class ShowComponent implements OnInit {
  @ViewChild("canvasElement",{static:false}) canvas:ElementRef;
  current = 0;
  displayedColumns: string[] = ['id', 'name','actions'];
  fDisplayedColumns: string[] = ['name','floor','actions'];
  rDisplayedColumns: string[] = ['name','floor','room','actions'];
  dataSource = [];
  fDataSource = [];
  rDataSource = [];
  vDataSource = [];
  imgUrl:string = null;
  offset:number = 0;
  limit:number = 5;
  colorList:string[] = ['#ff1','#000'];
  constructor(private api:ShowService,private change:ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.building();
  }

  building(){
    this.api.getBuildingList(this.offset,this.limit).subscribe((bList)=>{
      this.dataSource = bList.buildingList.map((v,index)=>{return {'id':index,'name':v}});
      this.change.detectChanges();
    });
    this.current = 0;
  }

  floor(name:string){
    this.api.getFloorList(name,0,100).subscribe(f=>{
      this.fDataSource = f.floorList.map(v=>{return {'name':name,'floor':v}});
      console.log(this.fDataSource);
      this.change.detectChanges();
    });
    this.current = 1;
  }

  room(name:string,floor:number){
    this.api.getRoomList(name,floor,0,100).subscribe(r=>{

      this.rDataSource = r.roomList.map(v=>{return {'name':name,'floor':floor,'room':v}});
      console.log(this.fDataSource);
      this.change.detectChanges();
    });
    this.current = 2;
  }

  image(name:string,floor:number,room:string){
    this.current = 3;
    this.imgUrl = "http://link.hdussta.cn:9099/428.jpg";
    // this.api.getImage(name,floor,room).subscribe(v=>{
    //   this.vDataSource = v.url;
    //   console.log(this.fDataSource);
    //   this.change.detectChanges();
    // });

    let ctx = this.canvas.nativeElement;
    if (ctx.getContext) {
      let img1 = new Image();
      this.api.getPointList(name,floor,room,0,100).subscribe(value => {
        let idList = [];
        value.pointList.forEach(v=>{
          if(idList.filter(x=>x==v.uID).length==0){
            idList.push(v.uID);
          }
        });
        const colors = this.colorList;
        img1.onload = function (e) {
          ctx.width = img1.width;
          ctx.height = img1.height;
          console.log("height:"+img1.height+" width:"+img1.width);
          ctx = ctx.getContext('2d');
          ctx.drawImage(img1, 0, 0);
          idList.forEach((v,index)=>{
            //forEach,map,filter,reduce,sort
            console.log(value.pointList.filter(x=>x.uID==v));
            value.pointList.filter(x=>x.uID==v).forEach((x,i)=>{
              ctx.fillStyle=colors[index];
              if(i==0) ctx.moveTo(x.x,x.y);
              else ctx.lineTo(x.x,x.y);
              ctx.stroke();
            })
          });
        };
        img1.src = this.imgUrl;
      });
    }
  }

  nextPage(){
    this.offset = this.offset+ this.limit;
    this.building();
  }

  prePage(){
    this.offset = this.offset- this.limit;
    this.building();
  }

}
