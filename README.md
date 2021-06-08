# ngx-datetime
[![npm version](https://badge.fury.io/js/ngx-datetime.svg)](https://badge.fury.io/js/ngx-datetime)


Angular 5 compatible (by https://github.com/robisim74/angular-library-starter) fork of https://github.com/nkalinov/ng2-datetime datetime picker (plugins wrapper)

##### NPM PACKAGE: https://www.npmjs.com/package/ngx-datetime

##### DEMO: https://nkalinov.github.io/ng2-datetime

## Dependencies
- [Bootstrap3 (__CSS only__)](http://getbootstrap.com/)
- [jQuery 2+ (supports v3)](http://jquery.com/)
- [Bootstrap-datepicker __(JS+CSS)__](http://eternicode.github.io/bootstrap-datepicker/)
    - `npm install --save bootstrap-datepicker` 
    - or use the bundled version from `src/vendor/bootstrap-datepicker`
- [Bootstrap-timepicker __(JS+CSS)__](http://jdewit.github.io/bootstrap-timepicker/)
    - `npm install --save bootstrap-timepicker` 
    - or use the bundled version from `src/vendor/bootstrap-timepicker`

## Installation
`npm install --save ngx-datetime`

## Usage
1. import some way or another the required dependencies
2. `import {NKDatetime} from 'ngx-datetime/ngx-datetime';`
3. Add to your component's directives property
```
@Component({
    ...
    directives: [NKDatetime],
    ...
})
```
4. Use it: `<datetime [(ngModel)]="date"></datetime>`

See the [__DEMO__](https://nkalinov.github.io/ng2-datetime) and it [__source__](https://github.com/nkalinov/ng2-datetime/tree/master/demo) for more information.

## Contributing
Fork > Create > Pull request

## Thanks
- @jdewit for the [timepicker plugin](https://github.com/jdewit/bootstrap-timepicker)
- @eternicode for the [datepicker plugin](https://github.com/eternicode/bootstrap-datepicker)

### TODO:
- test ControlValueAccessor
