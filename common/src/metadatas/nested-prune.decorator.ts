import { SetMetadata } from '@nestjs/common';

/**
 *
 *  @param nestObjects A sequences of stings specifies the nest field that should be pruned.
 *
 */

export const NESTED_OBJECT_PRUNING = 'NESTED_OBJECT_PRUNING';

export const NestedPrune = (...nestObjects: string[]) => {
  return SetMetadata(NESTED_OBJECT_PRUNING, nestObjects);
};
