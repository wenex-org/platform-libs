import { getLogger } from 'log4js';
import { toKebabCase } from 'naming-conventions-modeler';

import { LogLevel } from '../enums';

export const logger = (scope?: string, level?: LogLevel) => {
  const log = getLogger(scope ? toKebabCase(scope) : undefined);

  log.level = level ?? LogLevel.All;

  return log;
};

export type LoggerType = ReturnType<typeof logger>;
