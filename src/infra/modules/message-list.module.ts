import { NgModule } from '@angular/core';
import { MessageListStateContainer } from '../../core/containers/messageList/MessageListStateContainer';
import { MessageListEffect } from '../../core/effects/MessageListEffect';
import { MessageListRepository } from '../../core/ports/driven/MessageListRepository';
import { EffectCreator } from '../../core/ports/driver/EffectCreator';
import { StateSelector } from '../../shared/abstract/StateSelector';
import { MessageListRepositoryAdapter } from '../adapters/MessageListRepositoryAdapter';
import { MessageListSelectorService } from '../services/messageList/message-list-selector.service';




@NgModule({
 providers: [
  {
    provide: MessageListEffect, useFactory: (r: MessageListRepository) => new MessageListEffect(r),
    deps: [MessageListRepositoryAdapter]
  },
  {
    provide: MessageListStateContainer, useFactory: (e: EffectCreator, s: StateSelector) => new MessageListStateContainer(e, s),
    deps: [MessageListEffect, MessageListSelectorService]
  }
 ]
})
export class MessageListModule { }
