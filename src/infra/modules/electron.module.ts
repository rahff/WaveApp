import { NgModule } from '@angular/core';

import { ElectronApi } from '../../../shared/ElectronApi';

declare const electronApi: ElectronApi

@NgModule({
  providers: [
    {
      provide: "FileSystemBridge", useFactory: ()=> electronApi.fileSystemBridge
    }
  ]
  
})
export class ElectronModule { }
