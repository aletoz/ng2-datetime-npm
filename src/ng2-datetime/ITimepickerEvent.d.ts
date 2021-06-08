export interface ITimepickerEvent {
    time: {
        value: number;
        meridian: string;
        hours: number;
        minutes: number;
        seconds: number;
    };
}
