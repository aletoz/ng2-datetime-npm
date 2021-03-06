import { ModuleWithProviders } from '@angular/core';
export declare class NKDatetimeModule {
    /**
     * Use in AppModule: new instance of SumService.
     */
    static forRoot(): ModuleWithProviders;
    /**
     * Use in features modules with lazy loading: new instance of SumService.
     */
    static forChild(): ModuleWithProviders;
}
