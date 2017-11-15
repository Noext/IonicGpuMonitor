export class Gpu{
    clocks : string[];
    sensors : string[];
    pStates: string[];
    time : number;


    constructor(opts:any){
        this.clocks = opts.Clocks;
        this.sensors = opts.Sensors;
        this.pStates = opts.PStates;
        this.time = Date.now();
    }
}
