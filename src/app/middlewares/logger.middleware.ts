import { Container } from 'typedi';
import morgan from 'morgan';
import Logger from '../../Shared/domain/Logger';

const logger: Logger = Container.get('Shared.Logger');

const format = '[:method] [:url] [:remote-addr] [:status] [:res[content-length]] [:response-time ms]';

const removeLineBreaks = (string: string): string => string.replace(/[\r\n]/gm, '');

const stream = {
  write: (message: string) => {
    const line = removeLineBreaks(message);
    return logger.http(line);
  },
};

export default morgan(format, { stream });
  